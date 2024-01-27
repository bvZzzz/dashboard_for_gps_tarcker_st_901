<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Config\Settings;
use App\Http\Requests\PointRequest;
use App\Models\Point;
use Illuminate\Http\Request;

class PointsController extends Controller
{
    /**
     * Создает или обновляет точку
     *
     * Creates or updates a point
     *
     * @param PointRequest $request
     * @return void
     */
    public function store(PointRequest $request): void
    {
        $request->validated();
        //Создаем/обновляем точку - Create/update a point
        Point::query()->updateOrCreate(['uuid' => $request->uuid], $request->all());
        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::SUCCESS_MESSAGE, 'message' => __('messages.point_was_saved')]);
    }

    /**
     * Возвращает данные о точке, для редактирования
     *
     * Returns point data for editing
     *
     * @param Request $request
     * @return string
     */
    public function getPointData(Request $request): string
    {
        if ($request->has('uuid')){
            $point = Point::query()
                        ->where('uuid', $request->uuid)
                        ->first();

            return $point?->toJson();
        }

        return "";
    }

    /**
     * Удаляет точку
     *
     * Delete point
     *
     * @param string $uuid
     * @return void
     */
    public function delete(string $uuid): void
    {
        $device = Point::query()->where('uuid', $uuid)->first();
        //Удаляем - delete
        $device?->delete();
        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::INFOMESSAGE, 'message' => __('messages.point_was_deleted')]);
    }
}
