<template>
    <div class="w-80 bg-white border border-gray-200 relative" :class="loading ? 'overflow-y-hidden' : 'overflow-y-auto'">
        <div v-if="loading" class="absolute bg-white opacity-50 flex h-full items-center justify-center left-0 opacity-75 w-full z-50"></div>
        <div class="px-4 py-5 sm:px-6 border-b">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ $t("ui.information") }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {{ $t("ui.full_information") }}
            </p>
        </div>

        <div class="border-b">
            <dl>
                <div class="bg-gray-50 border-b border-gray-100 px-4 py-2 sm:gap-4 sm:grid-cols-3 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        {{ $t("ui.general") }}
                    </dt>
                </div>

                <div class="bg-white px-4 py-2 grid grid-cols-2">
                    <dt class="text-sm font-medium text-gray-500">
                        <div class="font-medium" id="rightBlock0">{{ $t("ui.driver") }}</div>
                    </dt>
                    <dd class="text-sm text-gray-900">
                        <div v-if="data.device" class="animated-background font-medium">{{ data.device.name }}</div>
                    </dd>
                </div>
                <div class="bg-white px-4 py-2 grid grid-cols-2">
                    <dt class="text-sm text-gray-500">
                        <div>{{ $t("ui.car") }}</div>
                    </dt>
                    <dd class="text-sm text-gray-900">
                        <div v-if="data.device" class="animated-background font-medium">{{ data.device.car_model }}</div>
                    </dd>
                </div>
                <div class="bg-white px-4 py-2 grid grid-cols-2">
                    <dt class="text-sm text-gray-500">
                        <div>{{ $t("ui.distance_km") }}</div>
                    </dt>
                    <dd class="text-sm text-gray-900">
                        <div v-if="data.device" class="animated-background font-medium">{{ data.device.distance }}</div>
                    </dd>
                </div>
                <div class="bg-white px-4 py-2 grid grid-cols-2">
                    <dt class="text-sm text-gray-500">
                        <div>{{ $t("ui.engine_hours") }}</div>
                    </dt>
                    <dd class="text-sm text-gray-900">
                        <div v-if="data.device" class="animated-background font-medium">{{ data.device.engineRuntime }}</div>
                    </dd>
                </div>
                <div class="bg-white px-4 py-2 grid grid-cols-2">
                    <dt class="text-sm text-gray-500">
                        <div>{{ $t("ui.last_point") }}</div>
                    </dt>
                    <dd class="text-sm text-gray-900">
                        <div v-if="data.device" class="animated-background font-medium">{{ data.device.lastPoint }}</div>
                    </dd>
                </div>
                <div class="bg-white px-4 py-2 grid grid-cols-2">
                    <dt class="text-sm text-gray-500">
                        <div>{{ $t("ui.total_points") }}</div>
                    </dt>
                    <dd class="text-sm text-gray-900">
                        <div v-if="data.device" class="animated-background font-medium">{{ data.device.points }}</div>
                    </dd>
                </div>
            </dl>
        </div>

        <div class="bg-gray-50 border-b border-gray-100 px-4 py-2 sm:gap-4 sm:grid-cols-3 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {{ $t("ui.points_list") }}
            </dt>
        </div>

        <div v-for="(point, index) in data.points" :key="point.uuid" class="flex flex-col border-b relative">
                <div class="align-middle inline-block min-w-full">
                    <div class="cursor-pointer hover:bg-blue-100 overflow-hidden" v-on:click="goLocation(index)">
                        <div class="px-2 py-2 relative">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <IconLocation class="w-6 h-6 text-blue-500"/>
                                </div>
                                <div class="ml-2 w-full">
                                    <div class="font-medium text-gray-700 text-sm">
                                       <span v-if="point.pointInfo && point.pointInfo.point_name">
                                            {{ point.pointInfo.point_name }}
                                       </span>
                                        <span v-else>{{$t('ui.client_not_found')}}</span>
                                    </div>
                                    <div v-if="point.pointInfo" class="text-xs text-gray-500">
                                        {{ point.pointInfo.address }}
                                    </div>
                                    <div v-if="point" class="text-xs text-gray-500">
                                        {{ point.time }}
                                    </div>
<!--                                    <div v-if="point" class="text-xs text-gray-500">-->
<!--                                        {{ point.lat }}, {{ point.long }}-->
<!--                                    </div>-->
                                </div>

                            </div>
                        </div>
                    </div>

                    <div v-if="point.pointInfo">
                        <a v-on:click="editPoint(point.pointInfo.uuid)" class="text-gray-600 hover:text-blue-500 cursor-pointer absolute right-2 top-2" title="Изменить данные">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400 hover:text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </a>
                    </div>
                    <div v-else>
                        <a v-on:click="newPoint([point.lat, point.long])" class="text-gray-600 hover:text-blue-500 cursor-pointer absolute right-2 top-2" title="Изменить данные">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400 hover:text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

        <transition name="fade" v-if="typeMap === store.state.yandex" >
            <PointDialog v-model:show="showEditPoint" :form-data="formData" :zoom="zoom"/>
        </transition>

        <transition name="fade" v-if="typeMap === store.state.osm">
            <PointDialogOsm v-model:show="showEditPoint" :form-data="formData" :zoom="zoom"/>
        </transition>
    </div>
</template>

<script setup>
import route from "ziggy-js";
import axios from "axios";
import {useModal} from "../../Src/composables/useModal";
import {onMounted, ref} from "vue";
import {useCoordsPosition} from "../../Src/composables/useCoordsPosition";
import PointDialog from "../UI/Dialogs/PointDialog.vue";
import IconLocation from "../UI/Svg/IconLocation.vue";
import PointDialogOsm from "../UI/Dialogs/PointDialogOsm.vue";
import {useStore} from "vuex";

const props = defineProps({data: Object, typeMap: String});
const emit = defineEmits(['goLocation']);
const store = useStore();
const zoom = Number(process.env.MIX_MAP_ZOOM);

let showEditPoint = ref(false);
let { uuid, loading, formData, modal, editItem } = useModal();
let { setCoordsPosition } = useCoordsPosition();

const fillAddress = (lat, long, key) => {
    axios.post(route('geocoding'), {
        lat: lat,
        long: long,
    }).then(function (response) {
        props.data.points[key].pointInfo = {
            address: response.data,
        }
    });
}
const goLocation = (key) => {
    let item = props.data.points[key];
    emit('goLocation', [item.lat, item.long]);
}
const newPoint = (coords) =>{
    showEditPoint.value = true;
    setCoordsPosition(coords);
}
const editPoint = (uuid) => {
    editItem(route('get.point'), uuid, showEditPoint);
}

onMounted(() => {
    // for (let key in props.data.points){
    //     let value = props.data.points[key];
    //
    //     if (value.pointInfo === null){
    //          fillAddress(value.lat, value.long, key);
    //     }
    // }
})
</script>


