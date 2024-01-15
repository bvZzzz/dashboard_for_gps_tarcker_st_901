<?php

namespace App\Http\Middleware;

use App\Http\Services\User\UserSessionService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserSessionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        UserSessionService::updateSession(auth()->user(), $request);

        return $next($request);
    }
}
