<?php

declare(strict_types=1);

namespace App\Http\Services\Location;

use App\Models\Coordinate;
use App\Models\Device;
use App\Models\Point;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GeoLocation extends GeoHelper
{

    /**
     * Массив с данными когда трекер находится в движении
     *
     * An array with data when the tracker is in motion
     */
    const MOVE = [
        'FFFF9FFF',
        'FFFFDFFF',
        'FBFF9FFF'
    ];

    /**
     * Массив с данными когда трекер стоит
     *
     * An array with data when the tracker is not moving
     */
    const STAY = [
        'FFF7FBFF',
        'FFFFBBFF',
        'FBFFBBFF'
    ];

    /**
     * Расстояние между точками, если дистанция > n,
     * то будет считать за следующую точку
     *
     * Distance between points, if distance > n,
     * then it will count as the next point
     */
    const DIST_STAY = 100;

    /**
     * Расстояние между точками, если больше дистанция > n, значит едет
     *
     * The distance between the points, if the distance is greater > n, then it’s moving
     */
    const DIST_MOVE = 50;

    const TYPE_ICON_FORMAT = 'png';

    /**
     * Ищет входящих в радиус клиентов по координатам
     *
     * Searches for clients within the radius by coordinates
     *
     * @param $lat - широта/latitude
     * @param $long - долгота/longitude
     * @param $columnLatitude - колонка с координатами широты в которой надо искать/column with latitude coordinates in which to search
     * @param $columnLongitude - колонка с координатами долготы в которой надо искать/column with longitude coordinates in which to search
     * @param $radius - радиус в милях/radius in miles
     * @return array|null
     */
    private function getPointsInRadius($lat, $long, $radius, string $columnLatitude = 'latitude', string $columnLongitude = 'longitude'): array|null
    {
        $point = Point::query()
                    ->fromRaw("(SELECT *, (((acos(sin(({$lat}*pi()/180)) * sin(({$columnLatitude}*pi()/180))+cos(({$lat}*pi()/180)) * cos(({$columnLatitude}*pi()/180)) * cos((({$long} - {$columnLongitude})*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance FROM points) a")
                    ->whereRaw("distance <= {$radius}")
                    ->orderBy('distance', 'asc')
                    ->limit(1)
                    ->first();

        return empty($point) ? null : $point->toArray();
    }

    /**
     * Возвращает количество времени которое машина была заведена - в минутах
     *
     * Returns the amount of time the car was started - in minutes
     *
     * @param $start
     * @param $end
     * @param $idTracker - ID устройcтва
     * @return int|bool|float
     */
    private function getEngineRuntime($start, $end, $idTracker): int|bool|float
    {
        $runtime = Coordinate::query()
                            ->selectRaw('COUNT(*) AS cnt')
                            ->where('event_datetime', '>=', $start)
                            ->where('event_datetime', '<=', $end)
                            ->where('id_tracker', $idTracker)
                            ->where('vehicle1', 'like', '%_FFF%')
                            ->groupBy('vehicle1')
                            ->first();
        if ($runtime){
            return $runtime->cnt * config('app.runtimeInterval') / 60;
        }

        return false;
    }

    /**
     * Делаем выборку в базе за период
     *
     * Receiving data from the database for a period
     *
     * @param $start
     * @param $end
     * @param $idTracker - ID устройcтва
     * @return mixed
     */
    private function getDataFromQuery($start, $end, $idTracker): mixed
    {
        return Coordinate::query()
                        ->select(['id', 'event_datetime', 'whattime', 'id_tracker', 'whattime','latitude','latmark','longitude','longmark', 'whatdate','vehicle1'])
                        ->where('event_datetime', '>=', $start)
                        ->where('event_datetime', '<=', $end)
                        ->where('id_tracker', $idTracker)
                        ->orderBy('event_datetime')
                        ->get();
    }

    /**
     * Перебирает массив $radius, ищет данные в базе,
     * находит ближайшие к переданным координатам точки и удаляет дубли
     *
     * Iterates through the $radius array, searches for data in the database,
     * finds the points closest to the transmitted coordinates and removes duplicates
     *
     * @param float $lat - широта
     * @param float $long - долгота
     * @param array $radius - радиус в милях
     * @return array|null
     */
    private function getCurrentPointData(float $lat, float $long, array $radius): array|null
    {
        $points = [];

        foreach ($radius as $item) {
            $points[] = $this->getPointsInRadius($lat, $long, $item);
        }

        $distance = array_column($points, 'distance');

        if(! empty($distance)){
            $minVal = min($distance);
            $points = array_filter($points, fn($value) => !is_null($value) && array_search($minVal, $value));
        }

        return collect(array_values($points))->unique('id')->first();
    }

    /**
     * @param float $lat - широта/latitude
     * @param float $long - долгота/longitude
     * @return float[]
     */
    private function getCoordsArray(float $lat, float $long): array
    {
        return [
            'lat' => $lat,
            'long' => $long,
        ];
    }

    /**
     * Подготавливает массив с данными точек и маршрута
     *
     * Prepares an array with point and route data
     *
     * @param $period
     * @param $idTracker
     * @return array
     */
    private function getPointsDeviceData($period, $idTracker): array
    {
        $rows = $this->getDataFromQuery($period['start'], $period['end'], $idTracker);
        $engineRuntime = $this->getEngineRuntime($period['start'], $period['end'], $idTracker);

        $mileage = 0; $stayCounter = 0; $notMoveCounter = 0; $filtered = []; $prevArray = [];

        foreach ($rows as $item) {
            if (empty($item->latitude) || empty($item->longitude)) continue;
            //Высчитываем широту, долготу - Calculate latitude, longitude
            $array = ['lat' => $item->latitude, 'long' => $item->longitude];
            //Первый прогон, заполняем значениями - First iterate, fill with values
            if(empty($prevArray['prevCoords'])){
                $prevArray = $this->fillPrevArray($array, $item);
                continue;
            }

            if(! empty($prevArray['prevCoords']['lat']) && ! empty($prevArray['prevCoords']['long'])){
                //Проверяем массив с точками тип: стоит на месте - Checking an array with points type: standing still
                if (! empty($prevArray['prevCoordsStay'])){
                    $array['distStay'] = $this->distance($array['lat'], $array['long'], $prevArray['prevCoordsStay']['lat'], $prevArray['prevCoordsStay']['long'], 'M'); //Расстояние между двумя точками
                }
                //Получим расстояние между двумя точками, интервал, скорость, время трекера
                //Get the distance between two points, interval, speed, tracker time
                $array = $this->getArrayValuesForCalc($array, $prevArray, $item);
                //Сравниваем разницу между временем сервера (записи точки) и временем с трекера, это позволит
                //более точно начертить маршрут, разброс от 50 до -50
                //We compare the difference between the server time (recording the point) and the time from the tracker,
                //this will allow us to more accurately draw the route, the range is from 50 to -50
                if ($this->diffTime($item->event_datetime, $array['trackerDateTime'])) continue;
                //Тут ловим стоит или едет - Let's determine if it's not moving or if it's moving
                if (! empty($array['distStay']) && $array['distStay'] < self::DIST_STAY) {
                    if ($stayCounter >= 1) continue;

                    $array['pointInfo'] = $this->getCurrentPointData($array['lat'], $array['long'], [0.1]);
                    $stayCounter++;
                } else {
                    $stayCounter = 0;
                }
                //Тут ловим если едет - if moving
                if($array['distMove'] > self::DIST_MOVE && in_array($item->vehicle1, self::MOVE)){
                    $mileage += $array['distMove']; //Пробег - Mileage
                    $array['mileage'] = $mileage;
                }
                //Тут ловим если заведен и стоит - if it's not moving
                if($array['distMove'] < self::DIST_MOVE && in_array($item->vehicle1, self::MOVE)){
                    if($notMoveCounter >= 1) continue;
                    $notMoveCounter++;
                } else {
                    $notMoveCounter = 0;
                }

                //Основной массив с данными - Main array with data
                $filtered[] = $array + [
                        'uuid' => Str::uuid(),
                        'event_datetime' => $item->event_datetime,
                        'time' => Str::ucfirst(Carbon::parse($item->event_datetime)->translatedFormat('l, d.m.Y, H:i')),
                        'vehicle' => $item->vehicle1,
                        'engineRuntime' => $engineRuntime,
                        'stayCounter' => $stayCounter,
                        'notMoveCounter' => $notMoveCounter,
                ];
                //Пишем в массив с точками координаты, чтобы можно было сравнить их в следующей итерации, тип: стоит
                //We write the coordinates into the array with the points so that we can compare them in the next iteration, type: does not move
                if(in_array($item->vehicle1, self::STAY)) {
                    $prevArray['prevCoordsStay'] = $this->getCoordsArray($array['lat'], $array['long']);
                }
                //Пишем в массив с точками координаты, чтобы можно было сравнить их в следующей итерации, тип: едет
                //We write the coordinates to the array with the points so that we can compare them in the next iteration, type: driving
                $prevArray['prevCoords'] = $this->getCoordsArray($array['lat'], $array['long']);
                $prevArray['prevTime'] = $item->event_datetime;
            }
        }
        //Получаем поинты (где останавливался) - Get points (where we stayed)
        $points = array_filter($filtered, fn($value) => $value['stayCounter'] > 0 && in_array($value['vehicle'], self::STAY));
        //Получаем поинты (где останавливался заведенный) - Get points (where I stopped but didn’t turn off the car)
        $pointMove = array_filter($filtered, fn($value) => $value['stayCounter'] > 0 && in_array($value['vehicle'], self::MOVE));
        //Получаем маршрут - Get route
        $traffic = $this->getLinesArray($filtered);
        //Получаем данные об устройстве - ФИО, итд - Get device info
        $device = $this->getDeviceInfo($idTracker, count($points), $filtered);

        return [
            'points' => $points,
            'point_move' => $pointMove,
            'lines' => $traffic,
            'device' => $device,
        ];
    }

    /**
     * Возвращает данные об устройстве
     *
     * Returns device data
     *
     * @param string $tracker
     * @param int $pointsCount
     * @param array $data
     * @return array
     */
    private function getDeviceInfo(string $tracker, int $pointsCount, array $data): array
    {
        //Считаем дистанцию - distance
        $distance = array_sum(array_column($data, 'distMove'));
        //Получаем данные - Getting data from the database
        $device = Device::query()
                    ->select(['devices.*', 'groups.value as group_name'])
                    ->leftJoin('groups', 'groups.id', '=', 'devices.group_id')
                    ->where('id_tracker', $tracker)
                    ->get()->tap(function ($items) use ($data, $distance, $pointsCount){
                        foreach ($items as $item) {
                               $item->distance = round($distance / 1000, 2); //Дистанция
                               $item->engineRuntime = ! empty($data[0]['engineRuntime']) ? $data[0]['engineRuntime'] : 0; //Моточасы
                               $dateTime = ! empty(array_key_last($data)) ? $data[array_key_last($data)]['event_datetime'] : '';
                               $item->lastPoint = ! empty($dateTime) ? Carbon::parse($dateTime)->format('H:i:s') : ''; //Последняя точка
                               $item->points = $pointsCount; //Кол-во точек
                               $item->car_icon = ! empty($item->type) ? Storage::disk('images')->url($item->type . '.' . self::TYPE_ICON_FORMAT)
                                                                      : Storage::disk('images')->url('car.png');
                        }
                    });

        if ($device){
            return $device->first()->toArray();
        }

        return [];
    }

    /**
     * Подготавливает данные для отрисовки маршрута на карте
     *
     * Prepares data for drawing the route on the map
     *
     * @param array $filtered
     * @return array
     */
    private function getLinesArray(array $filtered): array
    {
        $rdy = [];

        foreach ($filtered as $line) {
            $rdy[] = [
                $line['lat'],
                $line['long']
            ];
        }

        return $rdy;
    }

    /**
     * Заполняет массив данными
     *
     * Fills an array with data
     *
     * @param $array
     * @param $item
     * @return array
     */
    private function fillPrevArray($array, $item): array
    {
        if(in_array($item->vehicle1, self::STAY)) {
            $array['prevCoordsStay'] = $array;
        }

        $array['prevCoords'] = $array;
        $array['prevTime'] = $item->event_datetime;

        return $array;
    }

    /**
     * Сравнивает разницу между временем сервера (записи точки) и временем с трекера
     *
     * Compares the difference between the server time (record point) and the time from the tracker
     *
     * @param $firstTime
     * @param $secondTime
     * @return bool
     */
    private function diffTime($firstTime, $secondTime): bool
    {
        if($firstTime && $secondTime){
            $timeDiffTracker = strtotime($firstTime) - strtotime($secondTime);

            return $timeDiffTracker > 50 || $timeDiffTracker < -50;
        }

        return false;
    }

    /**
     * Заполняет массив данными расстояния, время, скорость, время трекера
     *
     * Fills the array with distance, time, speed, tracker time data
     *
     * @param array $array
     * @param array $prevArray
     * @param mixed $item
     * @return array
     * @throws \Exception
     */
    private function getArrayValuesForCalc(array $array, array $prevArray, mixed $item): array
    {
        //Расстояние между двумя точками - Distance between two points
        $array['distMove'] = $this->distance($array['lat'], $array['long'], $prevArray['prevCoords']['lat'], $prevArray['prevCoords']['long'], 'M');
        //Интервал между двумя точками - Time interval between two points
        $array['timeDiff'] = $this->getTimeDiff($item->event_datetime, $prevArray['prevTime']);
        //Скорость - Speed
        $array['speed'] = ($array['distMove'] > 0 && !empty($array['timeDiff'])) ? $this->getSpeed($array['distMove'], $array['timeDiff']) : 0;
        //Трекер шлет свое время, приводим в нормальный вид чтобы можно было его сравнить - The tracker sends its time, we bring it into normal form so that it can be compared
        $array['trackerDateTime'] = $this->getCorrectTrackerDateTime($item->whatdate, $item->whattime);

        return $array;
    }

    /**
     * Возвращает дату в нужном виде
     *
     * Returns the date in the required form
     *
     * @param $value
     * @return array
     */
    private function getIntervalDate($value): array
    {
        $start = empty($value) ? now() : Carbon::parse($value['from']);
        $end = empty($value) ? now() : Carbon::parse($value['to']);

        return [
            'start' => $start->startOfDay()->toDateTimeLocalString(),
            'end' => $end->endOfDay()->toDateTimeLocalString(),
        ];
    }

    /**
     * Возвращает данные точек и маршрута
     *
     * Returns point and route data
     *
     * @param $interval
     * @param string $idTracker
     * @return array
     * @throws \Exception
     */
    public function handle($interval, string $idTracker): array
    {
        $period = $this->getIntervalDate($interval);

        return $this->getPointsDeviceData($period, $idTracker);
    }

}
