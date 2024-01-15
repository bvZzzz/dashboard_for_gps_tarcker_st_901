<?php

namespace App\Http\Traits;

use App\Models\User;
use Illuminate\Http\Request;

trait WithFileUpload
{
    /**
     * Проверяет что пришло из браузера, если файл то загружает и возвращает имя
     * если пусто, то смотрит в фото базе, если есть возвращает его.
     *
     * Checks what came from the browser, if the file is downloaded and returns the name,
     * if empty, then looks in the photo database, if there is one, returns it.
     *
     * @param Request $request
     * @param $model
     * @return string
     */
    protected function uploadFile(Request $request, $model): string
    {
        $file = $request->has('photo') ? $request->photo : null;

        if (! is_null($file)){
            $filename = $file->store('images', 'public');

            preg_match('/[\w.]+$/', $filename, $matches);

            return $matches[0] ?? '';
        }

        return $this->checkPhotoInTable($request, $model);
    }

    /**
     * Проверяет есть ли фото в базе
     *
     * Looking for a photo in the database
     *
     * @param Request $request
     * @param $model
     * @return string|null
     */
    protected function checkPhotoInTable(Request $request, $model): string|null
    {
        if (empty($request->get('photo'))){
            $item = $model::query()->where('uuid', $request->uuid)->first();

            if (! empty($item->photo)){
                return $item->photo;
            }
        }

        return '';
    }

    /**
     * Возвращает параметры валидации в зависимости от условия
     *
     * Returns validation parameters depending on the condition
     *
     * @param Request $request
     * @return string
     */
    protected function getValidateImage(Request $request): string
    {
        $file = $request->has('photo') ? $request->photo : null;

        if (! is_null($file)){
            return 'image|mimes:'.config('app.filetypes').'|max:'.config('app.filesize');
        }

        return 'max:255';
    }
}
