<?php

namespace App\Http\Controllers\Auth;

use App\Http\Config\Settings;
use App\Http\Controllers\Controller;
use App\Http\Traits\WithFileUpload;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    use WithFileUpload;
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'photo' => $this->getValidateImage($request)
        ]);

        $name = explode(' ', $request->name);
        $photo = $this->uploadFile($request, User::class);

        User::create([
            'first_name' => $name[0],
            'last_name' => $name[1] ?? '',
            'email' => $request->email,
            'uuid' => Str::uuid()->toString(),
            'password' => Hash::make($request->password),
            'rule' => 1,
            'photo' => $photo,
            'map' => 'osm'
        ]);

        //Отправим сообщение, что всё ок
        session()->flash('flash_msg', ['type' => Settings::SUCCESS_MESSAGE, 'message' => __('messages.user_was_saved')]);
    }
}
