<?php

namespace App\Http\Traits;

use App\Models\Log;
use Carbon\Carbon;

trait WithServer
{
    /**
     * Возвращает информацию о работе сервера и подключений
     *
     * Returns information about the operation of the server and connections
     *
     * @return array
     */
    private function getAllServerData(): array
    {
        $data = $this->getLogData();

        return [
            'server_ip' => request()->server('SERVER_ADDR'),
            'port' => $data['server']?->port,
            'host' => request()->server('HTTP_HOST'),
            'status' => !empty($data['server']->created_at) && now()->subHour(1) < $data['server']->created_at,
            'uptime' => $data['server']?->created_at->diffForHumans(),
            'conn_list' => $data['conn']
        ];
    }

    /**
     * Возвращает данные из лог файла
     *
     * Returns data from a log file
     *
     * @return array
     */
    private function getLogData(): array
    {
        $serv = Log::query()
                    ->whereDate('created_at', Carbon::today())
                    ->whereTime('created_at', '>', now()->subHour(1))
                    ->where('event', 'Server started')
                    ->orderBy('created_at', 'desc')
                    ->limit(1)
                    ->first();


        $connections = Log::query()
                        ->select(['ip'])
                        ->whereDate('created_at', Carbon::today())
                        ->whereTime('created_at', '>', now()->subMinute(15))
                        ->groupBy('ip')
                        ->get()->toArray();

        return [
            'server' => $serv,
            'conn' => $connections
        ];
    }
}
