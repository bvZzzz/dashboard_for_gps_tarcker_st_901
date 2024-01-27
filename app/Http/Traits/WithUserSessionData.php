<?php

namespace App\Http\Traits;

use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Jenssegers\Agent\Agent;

trait WithUserSessionData
{
    /**
     * Create a new agent instance from the given session.
     *
     * Создать новый экземпляр агента из данного сеанса.
     *
     * @param  mixed  $session
     * @return Agent
     */
    protected function createAgent($session): Agent
    {
        return tap(new Agent, function ($agent) use ($session) {
            $agent->setUserAgent($session->user_agent);
        });
    }

    /**
     * Returns user data stored in the session
     *
     * Возвращает данные пользователя хранящиеся в сессии
     *
     * @param string|null $id
     * @return array
     */
    public function getUserSessionData(string|null $id = null): array
    {
        if (\auth()->check()){
            $users = User::query()
                ->select(['id', 'uuid', 'first_name', 'last_name', 'email', 'photo', 'map'])
                ->whereId($id ?: Auth::user()->getAuthIdentifier())
                ->get(config('app.pagination'));

            return $this->sessionInfo($users)->toArray()[0] ?? [];
        }

        return [];
    }

    /**
     * Возвращает по всем пользователям хранящиеся в сессии
     *
     * Returns for all users stored in the session
     *
     * @return mixed
     */
    public function getAllUsersSessionData(): mixed
    {
        $user = User::query()
            ->select(['id', 'uuid', 'first_name', 'last_name', 'email', 'photo'])
            ->when(Request::input('q'), function ($query, $search){
                $query->whereRaw('CONCAT(first_name, last_name, email) LIKE "%' . $search . '%"');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(config('app.pagination'))
            ->withQueryString();

        return $this->sessionInfo($user);
    }

    /**
     * Добавим доп. поля
     *
     * Let's add extra. fields
     *
     * @param $user
     * @return mixed
     */
    private function sessionInfo($user)
    {
        return $user->tap(function ($items){
            foreach ($items as $item) {
                $session = $item->session()->first();
                $item->session = $this->getSessionInfo($session, $item);
                $item->photoUrl = empty($item->photo) ? '' : Storage::disk('images')->url($item->photo);
                $item->map = empty($item->map) ? 'osm' : $item->map;
            }
    });
    }

    /**
     * Приводим в нужный нам вид
     *
     * Return user data
     *
     * @param $session
     * @param $user
     * @return array
     */
    private function getSessionInfo($session, $user): array
    {
        $agent = $session ? $this->createAgent($session) : null;
        $lastActivity = ! empty($session->last_activity) ? Carbon::createFromTimestamp($session?->last_activity)->diff() : false;

        return [
            'ip_address' => $session->ip_address ?? '0.0.0.0',
            'is_current_device' => $session?->id === request()->session()->getId(),
            'last_active' => $session ? Carbon::createFromTimestamp($session->last_activity)->diffForHumans() : '',
            'online' => !empty($lastActivity) && $lastActivity->i < 5 && $lastActivity->days === 0,
            'platform' => $agent?->platform() ?? '',
            'device' => $agent?->device() ?? '',
            'browser' => $agent?->browser() ?? '',
//            'user' => $user?->toArray(),
        ];
    }
}
