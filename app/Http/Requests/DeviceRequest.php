<?php

namespace App\Http\Requests;

use App\Models\Device;
use Illuminate\Foundation\Http\FormRequest;

class DeviceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function messages(): array
    {
        return [
            'group_id.required' => __('messages.empty_group'),
            'car_model.required' => __('messages.empty_car_model'),
            'car_number.required' => __('messages.empty_car_number'),
            'id_tracker.unique' => __('messages.empty_id_tracker'),
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        //Смотрим есть уже устройство или нет
        $device = Device::query()
                        ->where('id_tracker', $this->id_tracker)
                        ->first();

        $tracker = ! empty($device) && ! empty($this->get('uuid')) ? 'required|max:15|unique:devices,id_tracker,' . $device->id : 'required|max:15|unique:devices';
        $image = empty($this->photo) ? 'max:255' : 'image|mimes:'.config('app.filetypes').'|max:'.config('app.filesize');

        return [
                'name' => 'required|max:255',
                'car_model' => 'required|max:255',
                'car_number' => 'required|max:255',
                'group_id' => 'required',
                'id_tracker' => $tracker,
                'photo' => $image
        ];
    }
}
