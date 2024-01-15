<template>
    <yandex-map
        :coords="coords"
        :zoom="mapZoom"
        :controls="controls"
        :detailed-controls="detailedControls"
        @click="updateCoords"
    >

        <ymap-marker
            :coords="coords"
            :marker-id="1"
            :hint-content="$t('points.point_balloon_hint')"
        />
    </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
    name: "Map",

    components: {yandexMap, ymapMarker},
    emits: ['update:coordinates'],

    props: {
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
    },

    data() {
        return {
            coords: [
                this.latitude,
                this.longitude,
            ],
            zoom: this.mapZoom,
        }
    },

    setup(){
        const controls = ['geolocationControl'];
        const detailedControls = { zoomControl: { position: { right: 10, top: 50 } } };

        return {
            controls,
            detailedControls,
        }
    },

    methods: {
        updateCoords(e) {
            if (e.constructor.name === "r"){
                this.coords = e.get('coords');
                this.$emit('update:coordinates', e.get('coords'));
            }
        },
    }
}

</script>

