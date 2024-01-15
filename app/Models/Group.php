<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Group extends Model
{
    use HasFactory;

    protected $fillable = ['value', 'uuid'];

    protected $hidden = ['created_at', 'updated_at'];

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

    public function devices(): HasMany
    {
        return $this->hasMany(Device::class);
    }
}
