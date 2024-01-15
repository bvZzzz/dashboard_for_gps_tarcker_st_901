<?php

namespace App\Http\Controllers;

use App\Http\Config\Settings;
use App\Http\Requests\DeviceRequest;
use App\Http\Traits\WithFileUpload;
use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DevicesController extends Controller
{
    use WithFileUpload;

    /**
     * Создает или обновляет устройство
     *
     * Create or update device
     *
     * @param DeviceRequest $request
     * @return void
     */
    public function store(DeviceRequest $request)
    {
        //Проверка - validate
        $request->validated();
        //Загружаем аватар если есть - Upload avatar
        $photo = $this->uploadFile($request, Device::class);
        //Надо добавить/обновить поля, аватар прилетает в виде файла, нужно только имя - get the file name
        $array = $request->all();
        $array['photo'] = $photo; //Присваиваем имя файла - set file name
        //Создаем/обновляем данные - Create or update data
        Device::query()->updateOrCreate(['id_tracker' => $request->id_tracker], $array);
        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::SUCCESS_MESSAGE, 'message' => __('messages.device_was_saved')]);
    }

    /**
     * Возвращает данные об устройстве, для редактирования
     *
     * Returns device data for editing
     *
     * @param Request $request
     * @return string
     */
    public function getDeviceData(Request $request)
    {
        if ($request->has('uuid')){
            $device = Device::query()
                            ->where('uuid', $request->uuid)
                            ->get()->tap(function ($items){
                                foreach ($items as $item) {
                                    $item->src = empty($item->photo) ? '' : Storage::disk('images')->url($item->photo);
                                    $item->photo = null;
                                }
                            })->first();


            return $device?->toJson();

        }

        return response()->json([]);
    }

    /**
     * Удаляет устройство
     *
     * Delete device
     *
     * @param string $uuid
     * @return void
     */
    public function delete(string $uuid)
    {
        //Ищем - Find device
        $device = Device::query()->where('uuid', $uuid)->first();
        //Удаляем - delete
        $device?->delete();
        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::INFOMESSAGE, 'message' => __('messages.device_was_deleted')]);
    }
}
