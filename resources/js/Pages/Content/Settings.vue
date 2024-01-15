<template>
    <Head :title="$t('head.settings')"></Head>

    <header>
        <nav class="bg-gray-800 shadow-md z-20">
            <div class="px-6">
                <div class="flex h-20 items-center justify-between">
                    <div class="flex items-center gap-3 mr-10">
                        <IconLogo/>
                        <Link href="/" class="font-bold text-white text-xl">{{ $t('headers.dashboard') }}</Link>
                    </div>
                    <div>
                        <LogoutButton/>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <div class="flex w-full min-h-screen -mt-20 pt-20 overflow-x-hidden">
            <SidebarSettings :cur-template="curPage" @settings="clickHandler"/>

            <div class="p-1.5 bg-gray-300 w-full">
                <component v-if="curPage !== 'Points'" :is="components[curPage]" :data="data" :filters="filters" ref="template"/>
                <component v-else :is="components[curPage]" :data="data" :filters="filters" :map="map" ref="template"/>
            </div>
        </div>
    </main>

    <Toasts/>
</template>

<script setup>
import SidebarSettings from "../Blocks/SidebarSettings.vue";
import Profile from "./Templates/Profile.vue";
import Devices from "./Templates/Devices.vue";
import Users from "./Templates/Users.vue";
import Groups from "./Templates/Groups.vue";
import Points from "./Templates/Points.vue";
import Blacklist from "./Templates/Blacklist.vue";
import Key from "./Templates/Key.vue";
import Server from "./Templates/Server.vue";
import LogoutButton from "../UI/LogoutButton.vue";
import route from "ziggy-js";
import Toasts from "../UI/Messages/Toasts.vue";
import {ref} from "vue";

const components = {
    Devices,
    Users,
    Groups,
    Points,
    Profile,
    Blacklist,
    Server,
    Key
}

const props = defineProps({
    curPage: {
        type: String,
        default: 'Profile'
    },
    data: Object,
    filters: Object,
    map: String
})

const template = ref(null);

const clickHandler = (event) => {
    template.value.modal(event);
}

const logout = () => {
    window.location.href = route('logout');
}
</script>

