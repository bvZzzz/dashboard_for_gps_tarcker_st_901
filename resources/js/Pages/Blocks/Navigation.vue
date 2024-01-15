<template>
<!--    <div class="lg:px-8 px-4 sm:px-6">-->
<!--        <div class="flex h-20 items-center justify-between">-->
<!--        </div>-->
<!--    </div>-->

    <nav class="bg-gray-800 shadow-md z-20">
        <div class="px-6">
            <div class="flex h-20 items-center justify-between">
                <div class="flex">
                    <div class="flex items-center gap-3 mr-10 w-64">
                        <IconLogo/>
                        <Link
                            :href="route('dashboard')"
                            class="font-bold text-xl text-white">
                            {{ $t('headers.dashboard') }}
                        </Link>
                    </div>
                    <div class="flex items-center gap-4">
                        <ActionButton v-on:click="goToLocation">
                            <IconLocation class="w-5 h-5 mr-2"/>

                            <span class="text-white">
                                {{ $t('buttons.location') }}
                            </span>
                        </ActionButton>
                        <ActionButton v-on:click="showModal">
                            <IconCalendar class="w-5 h-5 mr-2"/>

                            <span class="text-white">
                                {{ $t('buttons.interval') }}
                            </span>
                        </ActionButton>
                        <ActionButton v-on:click="goSettings">
                            <IconSettingsV2 class="w-5 h-5 mr-2"/>

                            <span class="text-white">
                                {{ $t('buttons.settings') }}
                            </span>
                        </ActionButton>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="bg-gray-700 px-4 py-2 rounded-lg">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" v-model="checked" @change="updateMode" class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"></div>
                            <span class="ml-3 text-sm font-medium text-white">{{ $t('ui.update_location') }}</span>
                        </label>
                    </div>
                    <LogoutButton/>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import ActionButton from "../UI/ActionButton.vue";
import LogoutButton from "../UI/LogoutButton.vue";
import IconCalendar from "../UI/Svg/IconCalendar.vue";
import IconSettingsV2 from "../UI/Svg/IconSettingsV2.vue";
import route from "ziggy-js";

export default {
    components: {IconSettingsV2, IconCalendar, LogoutButton, ActionButton},

    props: {
        lastLocation: Object,
        modelValue: {
            type: Boolean,
            default: false,
        },
    },

    data(){
        return {
            checked: this.$props.modelValue,
        }
    },

    methods: {
        showModal(){
            this.$emit('open', true);
        },
        goToLocation(){
            this.$emit('goToLocation', [this.$props.lastLocation.lat, this.$props.lastLocation.long]);
        },
        updateMode(event){
            this.$emit('updateMode', event.target.checked);
        },
        goSettings(){
            window.location.href = route('settings');
        },

    }
}
</script>
