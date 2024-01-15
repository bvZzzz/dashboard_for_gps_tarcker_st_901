<?php

namespace App\Exceptions;

use App\Http\Config\Settings;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (QueryException $e, Request $request) {
            $request->session()->flash('flash_msg', ['type' => Settings::ERROR_MESSAGE, 'message' => __('messages.error_something_went_wrong')]);

            return redirect()->back()->withErrors(['message' => $e->getMessage()]);
        });
    }
}
