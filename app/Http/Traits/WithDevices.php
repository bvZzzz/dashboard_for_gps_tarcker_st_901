<?php

namespace App\Http\Traits;

use App\Models\Coordinate;
use App\Models\Device;
use App\Models\Group;
use Carbon\Carbon;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;

trait WithDevices
{
    /**
     * Возвращает все устройства в виде списка в меню настройки
     *
     * Returns all devices as a list in the menu
     *
     * @return array
     */
    private function getDevices(): array
    {
        $devices = Device::query()
            ->select([
                'devices.name', 'devices.group_id', 'devices.car_model', 'devices.car_number', 'devices.id_tracker', 'devices.photo',
                'devices.uuid', 'groups.value as group_name', 'groups.id as group_id',
            ])
            ->leftJoin('groups', 'groups.id', '=', 'devices.group_id')
            //Поиск - Search
            ->when(Request::input('q'), function ($query, $search){
                $query->whereRaw('CONCAT(name, id_tracker, car_number, car_model) LIKE "%' . $search . '%"');
            })
            ->paginate(config('app.pagination'))->tap(function ($items){
                //Вставим аватар в виде url - Prepare avatar
                foreach ($items as $item) {
                    $item->photoUrl = empty($item->photo) ? '' : Storage::disk('images')->url($item->photo);
                }
            })
            ->withQueryString();

        $groups = Group::query()->select(['id', 'value as name'])->get()->toArray();

        return [
            'db' =>$devices,
            'groups' => $groups
        ];
    }

    /**
     * Возвращает все устройства в виде отсортированного
     * списка на страницу панели управления
     *
     * Returns all devices as sorted list to the control panel page
     *
     * @return array
     */
    private function getSortDevices(): array
    {
        $groups = Group::all();
        $array = [];

        foreach ($groups as $group) {
            $devices = $group->devices->tap(function ($items){
                foreach ($items as $item) {
                    $diffInMinutes = ! empty($item->coords->first()->event_datetime) ? Carbon::parse($item->coords->first()->event_datetime)->diffInMinutes() : 999;

                    $item->photoUrl = empty($item->photo) ? '' : Storage::disk('images')->url($item->photo);
                    $item->last_activity = $diffInMinutes;
                }
            });

            $array[$group->value] = $devices->toArray();
        }

        return $array;
    }

    /**
     * Возвращает последнее местоположение присланное с устройства
     *
     * Returns the last location sent from the device
     *
     * @param string|null $tracker
     * @return array
     */
    private function getLastCoordsPosition(string|null $tracker): array
    {
        if ($tracker){
            $item = Coordinate::query()->where('id_tracker', $tracker)->latest('event_datetime')->first();

            if ($item){
                return [
                    'lat' => $item->latitude,
                    'long' => $item->longitude
                ];
            }
        }

        return ['lat' => 0, 'long' => 0];
    }
}
