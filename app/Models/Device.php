<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'group_id',
        'car_model',
        'car_number',
        'id_tracker',
        'photo',
        'uuid',
        'type'
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

    public function coords(): HasMany
    {
        return $this->hasMany(Coordinate::class, 'id_tracker', 'id_tracker')
                    ->select(['event_datetime'])
                    ->latest('event_datetime')
                    ->limit(1);
    }
}
