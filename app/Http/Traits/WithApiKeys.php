<?php

namespace App\Http\Traits;

use App\Http\Config\Settings;
use App\Models\AccessKey;
use Illuminate\Support\Str;

trait WithApiKeys
{
    /**
     * Возвращает API ключ, если нет, то создает
     *
     * Returns the API key, if not, creates
     *
     * @return mixed
     */
    public function getAPIKey(): mixed
    {
        $key = AccessKey::query()->select(['value'])->first();

        if (! $key){
            return AccessKey::create(['value' => Str::random(40)]);
        }

        return $key;
    }

    /**
     * Генерирует новый ключ
     *
     * Generates a new key
     *
     * @return string|void
     */
    public function generate()
    {
        $key = AccessKey::first();

        if ($key){
            $key->value = Str::random(40);
            $key->save();

            return $key->value;
        }

        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::ERROR_MESSAGE, 'message' => __('messages.api_key_generate')]);
    }
}
