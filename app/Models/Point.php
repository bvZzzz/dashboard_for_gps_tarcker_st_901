<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Point extends Model
{
    use HasFactory;

    protected $fillable = [
        'latitude',
        'longitude',
        'inn',
        'client_name',
        'client_name_official',
        'address',
        'point_name',
        'crm_code',
        'uuid'
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at'
    ];

    /**
     * Генерирует uuid если нет
     *
     * @param $value
     * @return void
     */
    public function setUuidAttribute($value)
    {
        $this->attributes['uuid'] = empty($value) ? Str::uuid() : $value;
    }
}
