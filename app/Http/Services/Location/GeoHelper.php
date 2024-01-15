<?php

namespace App\Http\Services\Location;

use Carbon\Carbon;
use Carbon\CarbonTimeZone;

class GeoHelper
{
    /**
     * Высчитывает дистанцию между двумя точками
     *
     * @param $lat1
     * @param $long1
     * @param $lat2
     * @param $long2
     * @param $unit
     * @return float
     */
    protected function distance($lat1, $long1, $lat2, $long2, $unit)
    {
        $theta = $long1 - $long2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);

        if (is_nan($miles)) return 0;

        return match ($unit) {
            "M" => ($miles * 1.609344) * 1000,
            "K" => ($miles * 1.609344),
            "N" => ($miles * 0.8684),
            default => $miles,
        };
    }

    /**
     * Возвращает широту, долготу
     *
     * @param $lat
     * @param $long
     * @return array
     */
    protected function getLatLongArray($lat, $long): array
    {
        $latf1 = floatval(substr($lat, 0, 2));
        $latf2 = floatval(substr($lat, 2, strlen($lat)));

        $lngf1 = floatval(substr($long, 0, 3));
        $lngf2 = floatval(substr($long, 3, strlen($long)));

        return [
            'lat' => round($latf1 + ( $latf2 / 60 ), 6),
            'long' => round($lngf1 + ( $lngf2 / 60 ), 6),
        ];
    }

    /**
     * Рассчитывает скорость
     *
     * @param $dist
     * @param $time
     * @return float|int
     */
    protected function getSpeed($dist, $time): float|int
    {
        return round($dist / $time * 60 * 60 / 1000, 2);
    }

    /**
     * Возвращает разницу в секундах
     *
     * @param $time1
     * @param $time2
     * @return false|int
     */
    protected function getTimeDiff($time1, $time2): bool|int
    {
        return strtotime($time1) - strtotime($time2);
    }

    /**
     * @param $pointCount
     * @return float|int
     */
    protected function getTimeWithPointCount($pointCount): float|int
    {
        return $pointCount * config('app.runtimeInterval') / 60;
    }

    /**
     * Трекер шлет свое время, приводим в нормальный вид чтобы можно было его сравнить
     * корректируем с поправкой на часовой пояс
     *
     * @param $trackerDate
     * @param $trackerTime
     * @return false|string
     * @throws \Exception
     */
    protected function getCorrectTrackerDateTime($trackerDate, $trackerTime): bool|string
    {
        if(!empty($trackerDate) && !empty($trackerTime)){
            if(strlen($trackerDate) == 6 && strlen($trackerTime) == 6){
                $tzUtc = CarbonTimeZone::create('UTC');
                $tzApp = CarbonTimeZone::create(config('app.timezone'));

                $date = (\DateTime::createFromFormat("dmy", $trackerDate))->format('Ymd');
                $current = Carbon::parse($date . $trackerTime, $tzUtc);
                $current->setTimezone($tzApp);

                return $current->format('Y-m-d H:i:s');
            }
        }

        return false;
    }
}
