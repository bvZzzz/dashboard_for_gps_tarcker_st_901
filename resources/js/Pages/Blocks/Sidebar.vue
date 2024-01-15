<template>
    <div class="flex-none bg-white h-full left-0 ml-0 top-20 w-80 overflow-y-auto overflow-x-hidden border-r border-gray-200">
<!--        <span class="absolute bg-gray-100 border-gray-100 border h-full hover:bg-gray-200 ml-80 outline-none focus:outline-none -mt-20"></span>-->

        <div>
            <div class="px-4 py-5 sm:px-6 border-b">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ $t("ui.device_list") }}
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    {{ $t("ui.all_devices") }}
                </p>
            </div>

            <div v-for="(item, index) in data">

                <div class="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        {{ index }}
                    </dt>
                </div>

                <div v-for="i in item">
                    <Link :href="route('dashboard', i.id_tracker)" class="flex flex-col block" :class="current(i.id_tracker) ? 'border-r-4 border-blue-500' : ''">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow-sm cursor-pointer hover:bg-blue-100 overflow-hidden">
                                        <div class="px-6 py-4 whitespace-nowrap relative">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10">
                                                    <div>
                                                        <img v-if="i.photo" :src="i.photoUrl" alt="user avatar" class="h-12 w-12 rounded-full">

                                                        <div v-else>
                                                            <IconProfile/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">
                                                        {{ i.name }}
                                                    </div>
                                                    <div class="text-sm text-gray-500">
                                                        {{  i.car_model }} - {{  i.car_number }}
                                                    </div>
                                                    <div class="absolute h-10 h-6 right-5 top-6">
                                                        <IconOnline v-if="i.last_activity < 5"/>

                                                        <IconOffline v-else/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconProfile from "../UI/Svg/IconProfile.vue";
import Href from "../UI/Href.vue";

export default {
    name: "Sidebar",

    components: {Href, IconProfile},

    props: {
        data: Object,
    },

    methods:{
        current(tracker){
            return location.pathname.match(tracker) !== null ? location.pathname.match(tracker)[0] === tracker : false;
        }
    },
}
</script>
