<?php

namespace App\Http\Traits;

use App\Models\Group;
use Illuminate\Support\Facades\Request;

trait WithGroups
{
    /**
     * Возвращает все группы
     *
     * Returns all groups
     *
     * @return mixed
     */
    private function getGroups()
    {
        return Group::query()
                    ->select(['uuid', 'value'])
                    ->when(Request::input('q'), function ($query, $search){
                        $query->where('value', 'LIKE', '%'.$search.'%');
                    })
                    ->paginate(config('app.bl_pagination'))->withQueryString();
    }

    /**
     * Возвращает группы для выбора в списке при создании устройства
     *
     * Returns the groups to select from a list when creating a device
     *
     * @return mixed
     */
    private function getGroupsFromList()
    {
        return Group::query()->select(['id', 'value as name'])->get()->toArray();
    }

}
