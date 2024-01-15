<template>
    <l-map ref="map" :zoom="mapZoom" :center="position">
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></l-tile-layer>

        <l-marker v-if="props.trackerData.points" v-for="index in props.trackerData.points" :lat-lng="[index.lat, index.long]">
            <l-tooltip v-if="index.pointInfo"> {{ index.pointInfo.point_name }} </l-tooltip>
            <l-tooltip v-else>{{t('ui.unknown')}}</l-tooltip>
        </l-marker>

        <l-marker v-if="props.trackerData.point_move" v-for="index in props.trackerData.point_move" :lat-lng="[index.lat, index.long]">
            <l-icon :icon-url="alternativeIcon" />
            <l-tooltip v-if="index.pointInfo"> {{ index.pointInfo.point_name }} </l-tooltip>
            <l-tooltip v-else>{{t('ui.standing')}}</l-tooltip>
        </l-marker>

        <l-marker v-if="lastPosition.lat > 0 && lastPosition.long > 0" :lat-lng="[lastPosition.lat, lastPosition.long]">
            <l-icon v-if="trackerData.device.car_icon" :icon-url="trackerData.device.car_icon" :icon-size="[48, 48]" />
            <l-tooltip> {{ t('ui.last_position') }} </l-tooltip>
        </l-marker>

        <l-polyline
            v-if="trackerData.lines"
            :lat-lngs="trackerData.lines"
            :color="color"
            :opacity="opacity"
            :weigh="weight"
        >
        </l-polyline>
    </l-map>
</template>

<script setup>
import { LMap, LTileLayer, LPolyline, LMarker, LTooltip, LIcon } from "@vue-leaflet/vue-leaflet";
import {onBeforeMount, onUpdated, ref} from "vue";
import {useI18n} from "vue-i18n";

let { t } = useI18n();
let color = process.env.MIX_STROKECOLOR;
let opacity = Number(process.env.MIX_STROKEOPACITY);
let weight = process.env.MIX_STROKEWIDTH_LINE;
let alternativeIcon = process.env.MIX_ALTERNATIVE_ICON;
let position = [];
let map = ref({});

const props = defineProps({
    mapZoom: {
        type: [String, Number],
        default: 10,
    },
    trackerData: Object,
    lastPosition: Object,
});

const to = (coords) => {
    if (map.value.leafletObject){
        map.value.leafletObject.panTo(coords)
    }
}

defineExpose({to});

onBeforeMount(()=> {
    setPosition();
})

onUpdated(() => {
    setPosition();
    to(position);
})

const setPosition = () => {
    position = props.lastPosition.lat > 0 && props.lastPosition.long > 0
                    ? [props.lastPosition.lat, props.lastPosition.long]
                    : [process.env.MIX_LATITUDE, process.env.MIX_LONGITUDE];
}
</script>

<style>
.leaflet-pane {
    z-index: 0;
}
</style>
