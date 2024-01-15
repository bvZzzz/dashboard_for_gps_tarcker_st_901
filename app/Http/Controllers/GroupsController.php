<?php

namespace App\Http\Controllers;

use App\Http\Config\Settings;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupsController extends Controller
{
    /**
     * Создает или обновляет группу
     *
     * Create or update group
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate([
            'value' => 'required|max:255'
        ]);
        //Создадим/обновим - Create/update
        Group::query()->updateOrCreate(['uuid' => $request->uuid ?? ''], $request->all());
        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::SUCCESS_MESSAGE, 'message' => __('messages.group_was_saved')]);
    }

    /**
     * Возвращает данные для редактирования группы
     *
     * Returns groups data for editing
     *
     * @param Request $request
     * @return string
     */
    public function getGroupData(Request $request): string
    {
        if ($request->has('uuid')){
            $group = Group::query()->where('uuid', $request->uuid)->first();

            return $group?->toJson();
        }

        return response()->json([]);

    }

    /**
     * Удаляет группу по uuid
     *
     * Delete group with uuid
     *
     * @param string $uuid
     * @return void
     */
    public function delete(string $uuid)
    {
        $group = Group::query()->where('uuid', $uuid)->first();

        //Удаляем - delete
        $group?->delete();
        //Отправим сообщение, что всё ок - Send message if all ok
        session()->flash('flash_msg', ['type' => Settings::INFOMESSAGE, 'message' => __('messages.item_was_deleted')]);
    }
}
