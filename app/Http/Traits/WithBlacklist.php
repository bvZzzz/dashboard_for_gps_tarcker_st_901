<?php

namespace App\Http\Traits;

use App\Models\Blacklist;
use Illuminate\Support\Facades\Request;


trait WithBlacklist
{
    /**
     * Возвращает черный список
     *
     * Returns ban list
     *
     * @return mixed
     */
    private function getBlacklist()
    {
        return Blacklist::query()
            ->when(Request::input('q'), function ($query, $search){
                $query->whereRaw('CONCAT(ip, port, value) LIKE "%' . $search . '%"');
            })
            ->paginate(config('app.bl_pagination'))->withQueryString();
    }
}
