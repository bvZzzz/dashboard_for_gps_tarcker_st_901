<?php

namespace App\Http\Controllers;
use App\Http\Services\Location\GeoLocation;
use App\Http\Traits\WithDevices;
use Illuminate\Http\Request;
use MoveMoveIo\DaData\Facades\DaDataAddress;

class IndexController extends Controller
{
    use WithDevices;

    /**
     * Готовит контент нужным образом и передает его
     *
     * Prepares content and delivers it
     *
     * @param Request $request
     * @param $id
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(Request $request, $id = null)
    {
        //Получаем координаты линии на карте - We get the coordinates of the line on the map
        $data = ! empty($id) ? $this->getCoordsData(['from' => $request->get('from'), 'to' => $request->get('to')], $id) : [];

        return inertia('Content/Home', [
            'devices' => $this->getSortDevices(), //Список устройств - Devices list
            'trackerData' => $data, //Координаты - Coords
            'position' => fn() => $this->getLastCoordsPosition($id), //Последняя позиция - Last position
            'map' => $this->getMapType(), //Тип карты - map type
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
     * Возвращает координаты за временной интервал
     *
     * Returns coordinates for a time interval
     *
     * @param $interval
     * @param string $tracker
     * @return array
     * @throws \Exception
     */
    public function getCoordsData($interval, string $tracker): array
    {
        $geo = new GeoLocation();

        return $geo->handle($interval, $tracker);
    }

    /**
     * На случай если в базе точка не найдена, на сайте будет выводится только адрес
     * полученный из сервиса DaData с помощью геокодирования.
     * Токены прописывать в файле .env
     * обращаться к ней через JS
     *
     * In case the point is not found in the database,
     * only the address received from the DaData service using geocoding will be displayed on the site.
     * Register tokens in the .env file
     * access it via JS (working Russian country only)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAddressFromCoords(Request $request)
    {
        if ($request->has('lat') && $request->has('long')){
            $address = DaDataAddress::geolocate($request->lat, $request->long, 1, 200, 1);

            if(! empty($address['suggestions'][0]['value'])){
                return response()->json($address['suggestions'][0]['value']);
            }
        }

        return response()->json([]);
    }
}
