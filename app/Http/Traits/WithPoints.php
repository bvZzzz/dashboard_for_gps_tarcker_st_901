<?php

namespace App\Http\Traits;

use App\Models\Point;
use Illuminate\Support\Facades\Request;

trait WithPoints
{
    /**
     * Возвращает точки
     *
     * Returns points
     *
     * @return mixed
     */
    private function getPoints()
    {
        return Point::query()
            ->when(Request::input('q'), function ($query, $search){
                $query->whereRaw('CONCAT(client_name) LIKE "%' . $search . '%"');
            })
            ->paginate(config('app.pagination'))->withQueryString();
    }
}
