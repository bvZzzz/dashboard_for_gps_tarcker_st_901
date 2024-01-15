<template>
    <LoadingSpinner :class="!loading ? 'hidden' : ''" :message="$t('ui.loading_message')"/>

    <div class="absolute right-32 top-5 z-30">
        <InputSearch @clear-search="clear" v-model="search" :placeholder="$t('users.search')"/>
    </div>

    <div class="relative">
        <div class="bg-gray-50 grid grid-cols-4 items-center py-1.5 rounded-t-md">
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('points.client') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('points.point_name') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('points.address') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></div>
        </div>

        <div class="bg-white divide-gray-200 divide-y min-w-full rounded-b-md">
            <div v-for="item in data.data" :key="item.uuid" class="grid grid-cols-4 hover:bg-gray-50 py-2.5">
                <div class="px-6 py-1.5 flex items-center">
                    <div class="flex items-center">
                        <div>
                            <IconPoint class="w-8 h-8 text-blue-500"/>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                                {{ item.client_name }}
                            </div>
                            <div class="text-xs text-gray-600 mt-1">
                                {{item.latitude}}, {{item.longitude}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-6 py-1.5 flex items-center text-sm text-gray-500">
                    <span class="text-sm font-medium text-gray-900">
                        {{ item.point_name }}
                    </span>
                </div>

                <div class="px-6 py-1.5 flex items-center text-sm text-gray-500">
                    <span class="text-sm font-medium text-gray-900">
                        {{ item.address }}
                    </span>
                </div>

                <div class="flex items-center justify-end gap-2 px-6">
                    <div>
                        <a v-on:click="editPoint(item.uuid)" class="text-gray-600 hover:text-blue-500 cursor-pointer" title="Изменить данные">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                        </a>
                    </div>

                    <div>
                        <a v-on:click="deletePoint(item.uuid)" class="text-gray-600 hover:text-red-500 cursor-pointer" title="Удалить">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div v-if="data.data.length === 0" class="text-gray-500 p-4">{{ $t('ui.empty') }}</div>
        </div>
    </div>

    <Pagination v-if="data.links" :links="data.links"/>

    <transition name="fade" v-if="map === store.state.yandex" >
        <PointDialog v-model:show="addPoint" :form-data="formData"/>
    </transition>

    <transition name="fade" v-if="map === store.state.osm">
        <PointDialogOsm v-model:show="addPoint" :form-data="formData"/>
    </transition>
</template>

<script setup>
import LoadingSpinner from "../../Components/LoadingSpinner.vue";
import InputSearch from "../../Components/InputSearch.vue";
import Pagination from "../../Blocks/Pagination.vue";
import IconPoint from "../../UI/Svg/IconPoint.vue";
import PointDialog from "../../UI/Dialogs/PointDialog.vue";
import PointDialogOsm from "../../UI/Dialogs/PointDialogOsm.vue";
import {useModal} from "../../../Src/composables/useModal";
import {useSearch} from "../../../Src/composables/useSearch";
import route from "ziggy-js";
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";

const props = defineProps({
    data: Object,
    filters: Object,
    map: String
})
const store = useStore();

let addPoint = ref(false);

let { uuid, loading, formData, editItem, deleteItem } = useModal();
let { search, clear } = useSearch('points', props.filters);
let { t } = useI18n();

const editPoint = (uuid) => {
    editItem(route('get.point'), uuid, addPoint)
}

const deletePoint = (uuid) => {
    deleteItem(route('delete.point', {"uuid": uuid}), t('points.confirm_delete'));
}

const modal = () => {
    addPoint.value = ! addPoint.value;
}

defineExpose({modal});

onMounted(() => {
    localStorage.removeItem('lat');
    localStorage.removeItem('long');
})
</script>

