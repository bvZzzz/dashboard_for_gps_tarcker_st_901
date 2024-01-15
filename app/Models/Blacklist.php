<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blacklist extends Model
{
    use HasFactory;

    protected $fillable = [
            'ip',
            'port',
            'value',
            'attempts',
    ];

    protected $hidden = ['id', 'updated_at'];

    protected $casts = ['created_at' => 'datetime:Y-m-d H:m:s'];
}
