<?php

namespace App\Http\Controllers;

use App\Http\Config\Settings;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Traits\WithFileUpload;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;

class ProfileController extends Controller
{
    use WithFileUpload;
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Возвращает данные пользователя по uuid
     *
     * Returns user data by uuid
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserData(Request $request): JsonResponse
    {
        if ($request->has('uuid')){
            $user = $this->getUser($request->uuid);

            return \response()->json([
                'name' => $user?->first_name . ' ' . $user?->last_name,
                'email' => $user?->email,
                'uuid' => $user?->uuid,
                'src' => empty($user->photo) ? '' : Storage::disk('images')->url($user->photo),
            ]);
        }

        return \response()->json([]);
    }

    /**
     * Обновляет данные пользователя
     *
     * Updates user data
     *
     * @param Request $request
     * @return void
     */
    public function updateUserData(Request $request): void
    {
        $user = $request->has('uuid') ? $this->getUser($request->uuid) : null;

        if ($user){
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
                'photo' => $this->getValidateImage($request),
            ]);

            $photo = $this->uploadFile($request, User::class);
            $name = explode(' ', $request->name);

            //Обновляем/Updating
            $user->update([
                'first_name' => $name[0],
                'last_name' => $name[1] ?? '',
                'email' => $request->email,
                'photo' => $photo,
                'map' => $request->has('map') && !empty($request->get('map')) ? $request->get('map') : 'osm'
            ]);

            //Отправим сообщение, что всё ок - Send message if all ok
            session()->flash('flash_msg', ['type' => Settings::SUCCESS_MESSAGE, 'message' => __('messages.user_data_was_updated')]);
        }
    }

    /**
     * Обновляет данные пользователя
     *
     * Updates user data
     *
     * @param Request $request
     * @return void
     */
    public function updateUserMap(Request $request): void
    {
        $user = $request->has('uuid') ? $this->getUser($request->uuid) : null;

        if ($user){
            //Обновляем/Updating
            $user->update([
                'map' => $request->has('map') && !empty($request->get('map')) ? $request->get('map') : 'osm'
            ]);

            //Отправим сообщение, что всё ок - Send message if all ok
            session()->flash('flash_msg', ['type' => Settings::SUCCESS_MESSAGE, 'message' => __('messages.user_data_was_updated')]);
        }
    }

    /**
     * Возвращает пользователя
     *
     * Returns the user info
     *
     * @param string $uuid
     * @return User|null
     */
    private function getUser(string $uuid): User|null
    {
        return User::query()->where('uuid', $uuid)->first();
    }

    /**
     * Обновляет пароль пользователя
     *
     * Updates the user's password
     *
     * @param Request $request
     * @return void
     */
    public function updatePasswd(Request $request): void
    {
        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = $this->getUser($request->uuid);

        $user?->update([
            'password' => Hash::make($request->password),
        ]);

        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::SUCCESS_MESSAGE, 'message' => __('messages.user_passwd_was_updated')]);
    }

    /**
     * Удаляет пользователя по uuid
     *
     * Delete user by uuid
     *
     * @param string $uuid
     * @return void
     */
    public function delete(string $uuid)
    {
        $user = $this->getUser($uuid);
        //Удаляем/Delete
        $user?->delete();
        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::INFOMESSAGE, 'message' => __('messages.user_was_deleted')]);
    }
}
