<template>
    <Head :title="$t('head.dashboard')"></Head>

    <header>
        <Navigation @open="toggle" @goToLocation="moveMap" @updateMode="updater" :model-value="isUpdate" :last-location="position"/>
    </header>

    <main>
        <div class="-mt-20 flex h-screen pt-20 w-full">
            <Sidebar :data="devices"/>

            <div class="flex-grow relative">
                <div class="h-full">
                    <YandexMap v-if="map === store.state.yandex" :tracker-data="trackerData" :last-position="position" :map-zoom="zoom" ref="template"/>
                    <OpenStreetMap v-if="map === store.state.osm" :tracker-data="trackerData" :last-position="position" :map-zoom="zoom" ref="template"/>
                </div>
            </div>

            <Information :data="trackerData" @go-location="moveMap" :type-map="map"/>
        </div>
    </main>

    <transition name="fade">
        <IntervalDialog v-model:show="isOpen"/>
    </transition>
</template>

<script setup>
import {onBeforeMount, onMounted, onUnmounted, onUpdated, ref} from "vue";
import {router} from "@inertiajs/vue3";
import Navigation from "../Blocks/Navigation.vue";
import Sidebar from "../Blocks/Sidebar.vue";
import {useCoordsPosition} from "../../Src/composables/useCoordsPosition";
import Information from "../Blocks/Information.vue";
import IntervalDialog from "../UI/Dialogs/IntervalDialog.vue";
import OpenStreetMap from "../Blocks/OpenStreetMap.vue";
import YandexMap from "../Blocks/YandexMap.vue";
import {useStore} from "vuex";

const template = ref(null);
const isOpen = ref(false);
const interval = process.env.MIX_UPDATE_INTERVAL;
const zoom = Number(process.env.MIX_MAP_ZOOM);

let timer = null;
let isUpdate = ref(false);

let { setCoordsPosition } = useCoordsPosition();

const props = defineProps({
    devices: Object,
    trackerData: Object,
    position: Object,
    map: String
})

const store = useStore();

const updater = (event) => {
    localStorage.setItem('update', event);

    isUpdate.value = event;

    if (isUpdate.value) startUpdate();
}

const startUpdate = () => {
    if (isUpdate.value){
        timer = setInterval(function () {
            router.reload({
                only: ['position']
            });

        }, interval);
    }
}

const stopUpdate = () => {
    clearInterval(timer);
}

onBeforeMount(() => {
    isUpdate.value = localStorage.getItem('update') && localStorage.getItem('update') === 'true';
})

onMounted(() => {
    if (isUpdate.value) {
        startUpdate();
    }

    setTimeout(()=> {
        document.querySelectorAll('a[href*=leaflet]').forEach(e => {
            e.remove();
        })
    }, 500);
})

onUpdated(() => {
    if (!isUpdate.value) stopUpdate();
})

onUnmounted(() => {
    stopUpdate();
})

const toggle = (event) => {
    isOpen.value = event;
}
const moveMap = (coords) => {
    template.value.to(coords);
    setCoordsPosition(coords);
}
</script>


