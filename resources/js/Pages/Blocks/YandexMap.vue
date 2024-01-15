<template>
    <div id="map" class="h-full"></div>
</template>

<script setup>
import {loadYmap} from 'vue-yandex-maps';
import {onMounted, onUpdated} from "vue";
import {useI18n} from "vue-i18n";

let map = {};
let geoObjects = {};
let geoObjectsMove = {};
let { t } = useI18n();

const mapSettings = {
    apiKey: process.env.MIX_APIKEY,
    lang: process.env.MIX_LANG,
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}

const props = defineProps({
    mapZoom: {
        type: [String, Number],
        default: 10,
    },
    trackerData: Object,
    lastPosition: Object,
});

const initMap = () => {
    map = new ymaps.Map("map", {
        center: [process.env.MIX_LATITUDE, process.env.MIX_LONGITUDE],
        zoom: props.mapZoom,
        controls: ['geolocationControl', 'zoomControl']
    }, {
        // Зададим опции для элементов управления.
        geolocationControlFloat: 'right',
        zoomControlPosition: { right: 10, top: 50 },
    });

    geoObjects = new ymaps.GeoObjectCollection({}, {
        preset: "islands#icon",
        iconColor: process.env.MIX_ICONCOLOR,
        strokeWidth: process.env.MIX_STROKEWIDTH_BALOON,
        geodesic: true
    });

    geoObjectsMove = new ymaps.GeoObjectCollection({}, {
        preset: "islands#icon",
        iconColor: process.env.MIX_ICONCOLOR_MOVE,
        strokeWidth: process.env.MIX_STROKEWIDTH_BALOON,
        geodesic: true
    });
}

const fillMarkers = () => {
    for (const index in props.trackerData.points) {
        let val = props.trackerData.points[index];

        let point_name = val.pointInfo ? val.pointInfo.point_name + ', ' : '';
        geoObjects.add(new ymaps.Placemark([val.lat, val.long], {
                balloonContent: point_name + val.time
            }
        ));
    }
}

const fillMarkersMove = () => {
    for (const index in props.trackerData.point_move) {
        let val = props.trackerData.point_move[index];

        let point_name = val.pointInfo ? val.pointInfo.point_name + ', ' : t('ui.standing');
        geoObjectsMove.add(new ymaps.Placemark([val.lat, val.long], {
                balloonContent: point_name + ' ' + val.time
            }
        ));
    }
}

const lastDevicePosition = () => {
    if (props.lastPosition !== undefined && props.lastPosition.lat && props.lastPosition.long){
        let icon = props.trackerData.device.car_icon;
        geoObjects.add(new ymaps.Placemark([props.lastPosition.lat, props.lastPosition.long], {
            hintContent: t('ui.last_position')
        }, {
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: icon,
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }));

        to([props.lastPosition.lat, props.lastPosition.long]);
    }
}

const fillRouteLine = () => {
    return new ymaps.Polyline(props.trackerData.lines, {}, {
            balloonCloseButton: false, // Отключаем кнопку закрытия балуна.
            strokeColor: process.env.MIX_STROKECOLOR, // Цвет линии.
            strokeWidth: process.env.MIX_STROKEWIDTH_LINE, // Ширина линии.
            strokeOpacity: process.env.MIX_STROKEOPACITY // Коэффициент прозрачности.
        });
}

const to = (coords) => {
    map.panTo(coords, {
        flying: 1
    });
}

defineExpose({to});

onMounted(async () => {
    await loadYmap(mapSettings);

    initMap();
    fillMarkers();
    fillMarkersMove();
    lastDevicePosition();

    map.geoObjects
        .add(fillRouteLine())
        .add(geoObjects)
        .add(geoObjectsMove);
})

onUpdated(() => {
    map.geoObjects.removeAll();
    geoObjects.removeAll();

    fillMarkers();
    fillMarkersMove();
    lastDevicePosition();

    map.geoObjects
        .add(fillRouteLine())
        .add(geoObjects)
        .add(geoObjectsMove);
})
</script>

