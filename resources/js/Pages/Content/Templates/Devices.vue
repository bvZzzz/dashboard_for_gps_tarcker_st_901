<template>
    <LoadingSpinner :class="!loading ? 'hidden' : ''" :message="$t('ui.loading_message')"/>

    <div class="absolute right-32 top-5 z-30">
        <InputSearch @clear-search="clear" v-model="search" :placeholder="$t('users.search')"/>
    </div>

    <div class="relative">
        <div class="bg-gray-50 grid grid-cols-4 items-center py-1.5 rounded-t-md">
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('devices.name') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('devices.car_number_brand') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('devices.device_id') }}
            </div>
        </div>

        <div class="bg-white divide-gray-200 divide-y min-w-full rounded-b-md">
            <div v-for="item in data.db.data" :key="item.id_tracker" class="grid grid-cols-4 hover:bg-gray-50">
                    <div class="px-6 py-3 flex items-center">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-12 w-12">
                                <div>
                                    <img v-if="item.photo" :src="item.photoUrl" alt="user avatar" class="h-12 w-12 rounded-full">

                                    <div v-else>
                                        <IconProfile/>
                                    </div>
                                </div>
                            </div>
                            <div class="ml-4">
                                <span class="text-sm font-medium text-gray-900">
                                    {{ item.name }}
                                </span>
                                <div class="text-sm text-gray-500">
                                    {{ item.group_name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-6 py-2 flex items-center text-sm text-gray-500">
                        {{ item.car_model }} - {{ item.car_number }}
                    </div>
                    <div class="px-6 py-1.5 flex items-center text-sm text-gray-500">
                        {{ item.id_tracker }}
                    </div>
                    <div class="flex items-center gap-2">
                        <a v-on:click="editDevice(item.uuid)" class="text-gray-600 hover:text-blue-500 cursor-pointer" title="Изменить данные">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                        </a>

                        <a v-on:click="deleteDevice(item.uuid)" class="text-gray-600 hover:text-red-500 cursor-pointer" title="Удалить">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </a>
                    </div>
            </div>

            <div v-if="data.db.data.length === 0" class="text-gray-500 p-4">{{ $t('ui.empty') }}</div>
        </div>
    </div>

    <Pagination v-if="data.db.links" :links="data.db.links"/>

    <transition name="fade">
        <DeviceDialog v-model:show="addDevice" :options="data.groups" :form-data="formData"/>
    </transition>
</template>

<script setup>
import route from "ziggy-js";
import {ref} from "vue";
import {useModal} from "../../../Src/composables/useModal";
import {useSearch} from "../../../Src/composables/useSearch";
import {useI18n} from "vue-i18n";
import DeviceDialog from "../../UI/Dialogs/DeviceDialog.vue";
import IconProfile from "../../UI/Svg/IconProfile.vue";
import Pagination from "../../Blocks/Pagination.vue";
import InputSearch from "../../Components/InputSearch.vue";
import LoadingSpinner from "../../Components/LoadingSpinner.vue";

const props = defineProps({
    data: Object,
    filters: Object
})

let addDevice = ref(false);

let { uuid, loading, formData, editItem, deleteItem } = useModal();
let { search, clear } = useSearch('devices', props.filters);
let { t } = useI18n();

const editDevice = (uuid) => {
    editItem(route('get.device'), uuid, addDevice)
}

const deleteDevice = (uuid) => {
    deleteItem(route('delete.device', {"uuid": uuid}), t('devices.confirm_delete'));
}

const modal = () => {
    addDevice.value = ! addDevice.value;
}

defineExpose({modal});
</script>
