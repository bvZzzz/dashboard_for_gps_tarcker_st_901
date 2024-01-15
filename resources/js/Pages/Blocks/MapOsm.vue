<template>
    <l-map ref="map" :zoom="mapZoom" :center="[latitude, longitude]" @click="updateCoords">
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></l-tile-layer>

        <l-marker :lat-lng.sync="coords">
            <l-tooltip>{{$t('points.point_balloon_hint')}}</l-tooltip>
        </l-marker>
    </l-map>
</template>

<script setup>
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import {onMounted, ref} from "vue";

let map = ref({});
let coords = ref([]);

const props = defineProps({
    latitude: {
        type: [String, Number],
    },
    longitude: {
        type: [String, Number],
    },
    mapZoom: {
        type: [String, Number],
        default: 10,
    },
});

const emit = defineEmits(['update:coordinates']);

const updateCoords = (event) => {
    if (event.latlng && map.value.leafletObject){
        map.value.leafletObject.panTo([event.latlng.lat, event.latlng.lng]);
        emit('update:coordinates', [event.latlng.lat, event.latlng.lng]);

        coords.value = [event.latlng.lat, event.latlng.lng];
    }
}

onMounted(() => {
    coords = ref([props.latitude, props.longitude]);
})
</script>

