<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\DevicesController;
use App\Http\Controllers\PointsController;
use App\Http\Controllers\AccessKeyController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->to('/dashboard');
});

require __DIR__.'/auth.php';

Route::middleware(['auth:web', 'user.session'])->group(function (){
    Route::get('/dashboard/{id?}', [IndexController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/{id?}', [IndexController::class, 'index'])->name('get.position');
    Route::get('/settings/{page?}', [SettingsController::class, 'render'])->name('settings');

    //Работа с пользователями/Working with Users
    Route::post('/create-user', [RegisteredUserController::class, 'store'])->name('create.user');
    Route::post('/update-user', [ProfileController::class, 'updateUserData'])->name('update.user');
    Route::post('/update-user-map', [ProfileController::class, 'updateUserMap'])->name('update.usermap');
    Route::post('/update-password', [ProfileController::class, 'updatePasswd'])->name('update.password');
    Route::delete('/delete-user/{uuid}', [ProfileController::class, 'delete'])->name('delete.user');
    Route::post('/get-userdata', [ProfileController::class, 'getUserData'])->name('user.data');

    //Работа с группами/Working with Groups
    Route::post('/create-group', [GroupsController::class, 'store'])->name('create.group');
    Route::post('/get-group', [GroupsController::class, 'getGroupData'])->name('get.group');
    Route::delete('/delete-group/{uuid}', [GroupsController::class, 'delete'])->name('delete.group');

    //Работа с устройствами/Working with Devices
    Route::post('/create-device', [DevicesController::class, 'store'])->name('create.device');
    Route::post('/get-device', [DevicesController::class, 'getDeviceData'])->name('get.device');
    Route::delete('/delete-device/{uuid}', [DevicesController::class, 'delete'])->name('delete.device');

    //Работа с точками/Working with Geo points
    Route::post('/create-point', [PointsController::class, 'store'])->name('create.point');
    Route::post('/get-point', [PointsController::class, 'getPointData'])->name('get.point');
    Route::delete('/delete-point/{uuid}', [PointsController::class, 'delete'])->name('delete.point');

    //Работа с ключами/returns api key - needed for android app(doesn't work yet)
    Route::post('/get-key', [AccessKeyController::class, 'generate'])->name('get.apikey');

    //Возвращает адрес по координатам
    Route::post('/geocoding', [IndexController::class, 'getAddressFromCoords'])->name('geocoding');
});



