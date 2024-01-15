<?php

namespace App\Http\Controllers;

use App\Http\Traits\WithApiKeys;
use App\Http\Traits\WithBlacklist;
use App\Http\Traits\WithDevices;
use App\Http\Traits\WithGroups;
use App\Http\Traits\WithPoints;
use App\Http\Traits\WithServer;
use App\Http\Traits\WithUserSessionData;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

class SettingsController extends Controller
{
    use WithUserSessionData, WithGroups, WithDevices, WithPoints, WithBlacklist, WithServer, WithApiKeys;

    /**
     * @param string $page
     * @return \Inertia\Response
     */
    public function render(string $page = 'profile')
    {
        $data = $this->getPageData($page);

        return inertia()->render('Content/Settings', [
            'curPage' => Str::ucfirst($page),
            'data' => $data,
            'filters' => Request::only(['q']),
            'map' => $this->getMapType(),
        ]);

    }

    /**
     * Возвращает название карты которая будет использоваться
     *
     * Returns the name of the card that will be used
     *
     * @return string
     */
    private function getMapType()
    {
        if (auth()->check()){
            return !empty(auth()->user()->map) ? auth()->user()->map : 'osm';
        }

        return "osm";
    }

    /**
     * Возвращает данные для выбранной страницы
     *
     * Returns data for the selected page
     *
     * @param string $page
     * @return mixed
     */
    private function getPageData(string $page)
    {
        return match ($page){
            'profile' => $this->getUserSessionData(),
            'server' => $this->getAllServerData(),
            'users' => $this->getAllUsersSessionData(),
            'groups' => $this->getGroups(),
            'devices' => $this->getDevices(),
            'points' => $this->getPoints(),
            'blacklist' => $this->getBlacklist(),
            'key' => $this->getAPIKey(),
            default => [],
        };
    }
}
