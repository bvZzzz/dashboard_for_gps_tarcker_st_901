<template>
    <button class="text-white border-l border-gray-300 px-2">
        <div v-on:click="logout" class="flex gap-2 items-center">
            <IconLogout class="w-5 h-5 text-gray-100"/>
            {{$t("buttons.logout")}}
        </div>
    </button>
</template>

<script>
import IconLogout from "./Svg/IconLogout.vue";
import route from "ziggy-js";

export default {
    name: "LogoutButton",
    components: {IconLogout},
    methods: {
        logout(){
            window.location.href = route('logout');
        },
    }
}
</script>
