<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Coordinate extends Model
{
    use HasFactory;

    protected $table = 'h02datas';

    protected $fillable = [
        'event_datetime',
        'hoc',
        'id_tracker',
        'sep1',
        'whattime',
        'sep2',
        'latitude',
        'latmark',
        'longitude',
        'longmark',
        'speed',
        'speedlongitude',
        'whatdate',
        'vehicle1',
        'vehicle2',
        'vehicle3',
        'vehicle4',
        'vehicle5',
        'vehicle6',
        'vehicle7',
    ];

    /**
     * Преобразует gps-координаты широту
     *
     * Converts GPS coordinates to latitude
     *
     * @param $value
     * @return float
     */
    public function getLatitudeAttribute($value)
    {
        $latf1 = floatval(substr($value, 0, 2));
        $latf2 = floatval(substr($value, 2, strlen($value)));

        return round($latf1 + ( $latf2 / 60 ), 6);
    }

    /**
     * Преобразует gps-координаты долготу
     *
     * Converts GPS coordinates to longitude
     *
     * @param $value
     * @return float
     */
    public function getLongitudeAttribute($value)
    {
        $lngf1 = floatval(substr($value, 0, 3));
        $lngf2 = floatval(substr($value, 3, strlen($value)));

        return round($lngf1 + ( $lngf2 / 60 ), 6);
    }
}
