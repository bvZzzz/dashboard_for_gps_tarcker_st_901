<?php

namespace App\Http\Services\User;

use App\Models\UserSession;

/**
 * Отвечает за запись данных пользователя в таблицу сессии
 */
class UserSessionService
{
    public static function clear($user)
    {
        if(! empty($user->id)){
            UserSession::where('user_id', $user->id)->delete();
        }
    }

    public static function setSession($user, $request)
    {
        if (! empty($user->id)){
            UserSession::insert([
                'id' => \Str::random(40),
                'user_id' => $user->id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->header('User-Agent'),
                'last_activity' => strtotime("now"),
            ]);
        }
    }

    public static function updateSession($user, $request)
    {
        if (! empty($user->id)){
            UserSession::updateOrInsert(
                ['user_id' => $user->id],
                [
                    'id' => \Str::random(40),
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->header('User-Agent'),
                    'last_activity' => strtotime("now"),
            ]);
        }
    }
//
//    public static function log($user, $action)
//    {
//        if (! empty($user->id)){
//            UserActionLog::insert([
//                'user_id' => $user->id,
//                'last_activity' => strtotime("now"),
//                'action' => json_encode($action)
//            ]);
//        }
//    }
}
