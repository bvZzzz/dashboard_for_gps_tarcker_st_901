<?php

namespace App\Http\Services\Mobile;

use App\Http\Services\Location\GeoHelper;
use App\Models\AccessKey;
use App\Models\Coordinate;
use App\Models\Device;
use App\Models\Log;
use App\Models\Point;
use Illuminate\Http\Request;

class MobileHandler extends GeoHelper
{
    /**
     * Массив с данными когда трекер находится в движении
     */
    const MOVE = [
        'FFFF9FFF',
        'FFFFDFFF',
        'FBFF9FFF'
    ];

    /**
     * Массив с данными когда трекер стоит
     */
    const STAY = [
        'FFF7FBFF',
        'FFFFBBFF',
        'FBFFBBFF'
    ];

    /**
     * Расстояние между точками, если дистанция > n,
     * то будет считать за следующую точку
     */
    const DIST_STAY = 50;

    /**
     * Расстояние между точками, если больше дистанция > n,
     * значит едет
     */
    const DIST_MOVE = 350;

    /**
     *  Радиус в котором искать точки
     */
    const RADIUS = [0.3];


    /**
     * Перебирает массив $radius, ищет данные в базе,
     * находит ближайшие к переданным координатам точки и удаляет дубли
     * В базе по 3 разных поля широты и долготы ищем по всем
     * latitude, longitude - Координаты по адресу (геокодирование)
     *
     * @param float $lat - широта
     * @param float $long - долгота
     * @param array $radius - радиус в милях
     * @return array
     */
    private function getCurrentPointData(float $lat, float $long, array $radius): array
    {
        $points = [];

        foreach ($radius as $item) {
            $points[] = $this->getPointsInRadius($lat, $long, $item);
        }

        $distance = array_column($points, 'distance');

        if(!empty($distance)){
            $minVal = min($distance);

            foreach ($points as $key => $value) {

                if (empty($points[$key])) {
                    unset($points[$key]);

                    continue;
                }

                $search = array_search($minVal, $points[$key]);
                if(!$search){
                    unset($points[$key]);
                }
            }

            $points = collect(array_values($points));

            return $points->unique('id')->first();
        }

        return [];
    }

    /**
     * Делаем выборку в базе за период
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
     * Возвращает количество времени которое машина была заведена - в минутах
     *
     * @param $start
     * @param $end
     * @param $idTracker - ID устройcтва
     * @return float|int
     */
    private function getEngineRuntime($start, $end, $idTracker): float|int
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
            return $runtime->cnt * config('app.runtimeInterval');
        }

        return false;
    }

    /**
     * Ищет входящих в радиус клиентов по координатам
     *
     * @param $lat - широта
     * @param $long - долгота
     * @param $columnLatitude - колонка с координатами широты в которой надо искать
     * @param $columnLongitude - - колонка с координатами долготы в которой надо искать
     * @param $radius - радиус в милях
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
     * Возвращает текущую позицию устройства
     *
     * @param $idTracker
     * @return mixed
     */
    private function getCurrentPosition($idTracker): mixed
    {
        return Coordinate::query()
                    ->select('latitude', 'longitude', 'event_datetime', 'vehicle1')
                    ->where('id_tracker', $idTracker)
                    ->orderBy('event_datetime', 'DESC')
                    ->limit(1)
                    ->first();
    }

    /**
     * Возвращает пробег
     *
     * @param $array
     * @return string
     */
    public function getMiliage($array): string
    {
        $latstart = 0; $lngstart = 0; $distance = 0;

        foreach($array as $item){
            // Высчитываем координаты
            $lat = $item->latitude;
            $lng = $item->longitude;

            if( $latstart != 0 || $lngstart != 0 ){
                // Считаем пробег
                if(in_array(trim( $item->vehicle1 ), self::MOVE)){
                    $dist = $this->distance( $latstart, $lngstart, $lat, $lng, "M" );
                    if( !is_nan( $dist ) ){
                        $distance += $dist;
                    }
                }

            }

            $latstart = $lat;
            $lngstart = $lng;
        }

        return number_format( $distance / 1000 );
    }

    /**
     * Возвращает количество точек
     *
     * @param $array
     * @return int
     */
    public function getGeoCount($array): int
    {
        $point_cnt = 0; $latstart = 0; $lngstart = 0;

        foreach($array as $g){
            if(! empty($latstart) && ! empty($lngstart)){
                if(in_array(trim( $g->vehicle1 ), self::STAY)){
                    $dist_stay = $this->distance( $latstart, $lngstart, $g->latitude, $g->longitude, "M");
                    if($dist_stay > self::DIST_STAY){
                        $point_cnt++;
                    }

                    $latstart = $g->latitude;
                    $lngstart = $g->longitude;
                }
            } else {
                $latstart = $g->latitude;
                $lngstart = $g->longitude;
            }
        }

        return $point_cnt;
    }

    /**
     * Возвращает основной список
     *
     * @param $interval
     * @return array
     */
    private function getMainList($interval): array
    {
        $array = []; $carArray = [];
        $row = Device::all();

        foreach($row as $r){
            // Моточасы
            $engineRuntime = $this->getEngineRuntime($interval['start'], $interval['end'], $r->id_tracker);

            $geo = $this->getDataFromQuery($interval['start'], $interval['end'], $r->id_tracker);

            if($geo){
                $distance = $this->getMiliage($geo);
                $pointCount = $this->getGeoCount($geo);
            }

            $currentPos = $this->getCurrentPosition($r->id_tracker);

            if ($currentPos){
                $carArray = [
                    "name" => $r->user_name . " " . $r->user_sname,
                    "auto_name" => $r->car_model . " - " . $r->car_number,
                    "id_tracker" => $r->id_tracker,
                    "latitude" => $currentPos->latitude,
                    "longitude" =>  $currentPos->longitude,
                    "enginehours" => date("H:i:s", mktime(0, 0, $engineRuntime)),
                    "distrun" => $distance,
                    "event_datetime" => $currentPos->event_datetime,
                    "count_geo" => $pointCount
                ];
            }

            $array[] = $carArray;
        }

        return $array;
    }

    /**
     * Возвращает список с точками и адресом
     *
     * @param $interval
     * @param $idTracker
     * @return array
     */
    private function getMoreList($interval, $idTracker): array
    {
        $json_array = [];
        $geo = $this->getDataFromQuery($interval['start'], $interval['end'], $idTracker);

        $latstart = 0; $lngstart = 0;

        foreach($geo as $g){
            if(! empty($latstart) && ! empty($lngstart)){
                if(in_array(trim($g->vehicle1), self::STAY)){
                    $dist = $this->distance($latstart, $lngstart, $g->latitude, $g->longitude, "M");

                    if($dist > self::DIST_STAY){
                        $geoCoderSql = $this->getCurrentPointData($g->latitude, $g->longitude, self::RADIUS);

                        if(! empty($geoCoderSql)){
                            $carArray = [
                                "title_text" => $geoCoderSql['client_name'],
                                "address_text" => !empty($geoCoderSql['address_physical']) ? $geoCoderSql['address_physical'] : "Нет адреса",
                                "eventdatetime_text" => $g->event_datetime,
                                "latitude" => $g->latitude,
                                "longitude" => $g->longitude
                            ];

                            $json_array[] = $carArray;
                        }
                    }

                    $latstart = $g->latitude;
                    $lngstart = $g->longitude;
                }
            } else {
                $latstart = $g->latitude;
                $lngstart = $g->longitude;
            }
        }

        return $json_array;
    }

    /**
     * Возвращает маршрут
     *
     * @param $interval
     * @param $idTracker
     * @return array
     */
    private function getDriversList($interval, $idTracker): array
    {
        $array = [];
        $geo = $this->getDataFromQuery($interval['start'], $interval['end'], $idTracker);

        $latstart = 0; $lngstart = 0;

        foreach($geo as $g){
            if(! empty($latstart) && ! empty($lngstart)){
                if(in_array(trim($g->vehicle1), self::MOVE)){
                    $dist = $this->distance($latstart, $lngstart, $g->latitude, $g->longitude, "M");

                    if(! is_nan( $dist ) && $dist < self::DIST_MOVE){
                        $carArray = array(
                            "latitude" => $latstart,
                            "longitude" => $lngstart,
                            "eventdatetime" => $g->event_datetime);

                        $array[] = $carArray;
                    }
                }
            }

            $latstart = $g->latitude;
            $lngstart = $g->longitude;
        }

        return $array;
    }

    /**
     * Пишет логи
     *
     * @param $ip
     * @param $port
     * @param $value
     * @return void
     */
    private function writeLogs($ip, $port, $value): void
    {
        Log::create([
            'event' => 'api request /mobile_json',
            'ip' => $ip,
            'port' => $port,
            'value' => $value
        ]);
    }

    /**
     * Возвращает дату в нужном виде
     *
     * @param $value
     * @return array
     */
    private function getIntervalDate($value): array
    {
        $interval = match ($value) {
            'today' => now(),
            'yesterday' => now()->modify('-1 day'),
            'mount' => now()->modify("first day of this month"),
            default => null,
        };

        return [
            'start' => $interval->startOfDay()->toDateTimeLocalString(),
            'end' => $value === 'mount' ? now()->endOfDay()->toDateTimeLocalString() : $interval->endOfDay()->toDateTimeLocalString(),
        ];
    }

    /**
     * Возвращает данные в нужном формате
     *
     * @param Request $request
     * @return array
     */
    public function handle(Request $request): array
    {
//      Logs
        $this->writeLogs($request->ip(), $request->getPort(), $request->userAgent());

        $token = $request->input('key');
        $postData = $request->input('value');

        $key = AccessKey::first();

        if($key->value !== $token) {
            $value = implode(', ', $request->all()) . $request->userAgent() . ', ' . $token;
            $this->writeLogs($request->ip(), $request->getPort(), $value);

            abort(403);
        }

        $value_array = explode( ";", $postData);
        $interval = $this->getIntervalDate($value_array[0]);
        $param = $value_array[1];
        $idTracker = ! empty($value_array[4]) ? $value_array[4] : '';

        return match ($param) {
            'main_list' => $this->getMainList($interval),
            'more_list' => $this->getMoreList($interval, $idTracker),
            'drive_list' => $this->getDriversList($interval, $idTracker),
            default => [],
        };
    }
}
