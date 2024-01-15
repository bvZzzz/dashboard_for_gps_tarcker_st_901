import { createInertiaApp } from '@inertiajs/vue3'
import { Link, Head, router } from "@inertiajs/vue3";
import { createApp, h } from 'vue'
import store from "./Src/store";
import route from "ziggy-js";
import '@vuepic/vue-datepicker/dist/main.css';
//Map Ya
import YmapPlugin from 'vue-yandex-maps'
//OpenStreetMap
import "leaflet/dist/leaflet.css";

//Language
import { createI18n } from 'vue-i18n';
import ru from './Locales/ru.json';
import en from './Locales/en.json';
//UI
import icons from './Pages/UI/Svg'

const languages = {
    en: en,
    ru: ru,
};

const mapSettings = {
    apiKey: process.env.MIX_APIKEY,
    lang: process.env.MIX_LANG,
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}

const i18n = createI18n({
    locale: process.env.MIX_LANGUAGE, //change language ru/en
    fallbackLocale: 'en',
    legacy: false,
    globalInjection: true,
    messages: languages,
})

createInertiaApp({
    progress: {
        color: '#00d7f3',
    },
    resolve: async name => {
        return (await import(`./Pages/${name}.vue`)).default;
        // let page = require(`./Pages/${name}.vue`).default;
        //
        // if (page.layout === undefined){
        //     page.layout = Layout;
        // }
        //
        // return page;
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(i18n)
            .use(YmapPlugin, mapSettings)
            .use(store)
            .component("Link", Link)
            .component("Head", Head)
            .mixin({ methods: { route } });

        icons.forEach(icon => {
            app.component(icon.name, icon);
        });

        app.mount(el);

        delete el.dataset.page

        return app;
    },

    title: title => `${title} | ${process.env.MIX_APP_NAME}`,
})


