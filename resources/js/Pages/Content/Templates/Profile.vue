<template>
    <LoadingSpinner :class="!loading.value ? 'hidden' : ''" :message="$t('ui.loading_message')"/>

    <div class="h-full md:gap-6 md:grid relative">
        <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            {{ $t('templates.info') }}
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            {{ $t('templates.user_data') }}
                        </p>
                    </div>
                    <div class="w-96 p-4">
                        <div class="flex gap-2">
                            <div>
                                <label for="maps" class="block mb-2 text-sm font-medium text-gray-900">Select map</label>
                                <select v-model="data.map" id="maps" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option selected>{{ $t('points.select_map') }}</option>
                                    <option value="yamap">Yandex map</option>
                                    <option value="osm">OpenStreetMap</option>
                                </select>
                            </div>

                            <div>
                                <button v-on:click="save" class="bg-blue-500 text-white rounded-md absolute top-2 right-2 px-4 py-2 hover:bg-blue-700 transition duration-150 active:bg-blue-400">Save</button>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('templates.full_name') }}
                                </dt>
                                <dd v-if="data.first_name" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ data.first_name }} {{ data.last_name }}
                                </dd>
                            </div>

                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('templates.email') }}
                                </dt>
                                <dd v-if="data.email" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ data.email }}
                                </dd>
                            </div>

                            <div class="border-b border-t px-4 py-5 sm:px-6">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                    {{ $t('templates.active') }}
                                </h3>
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                    {{ $t('templates.user_activity') }}
                                </p>
                            </div>

                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('templates.IP') }}
                                </dt>
                                <dd v-if="data.session" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{  data.session.ip_address }}
                                </dd>
                            </div>

                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('templates.platform_browser') }}
                                </dt>
                                <dd v-if="data.session" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ data.session.platform }} - {{ data.session.browser }}
                                </dd>
                            </div>

                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('templates.status') }}
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span v-if="data.session" class="text-green-500 font-bold">{{ $t('templates.online') }}</span>
                                    <span v-else class="text-red-500 font-bold">{{ $t('templates.offline') }}</span>
                                </dd>
                            </div>

                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('templates.last_activity') }}
                                </dt>
                                <dd v-if="data.session" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ data.session.last_active }}
                                </dd>

                            </div>
                        </dl>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import route from "ziggy-js";
import LoadingSpinner from "../../Components/LoadingSpinner.vue";
import {ref} from "vue";
import {router} from "@inertiajs/vue3";

let loading = ref(false);

const props = defineProps({
    data: Object,
    filters: Object,
})

const save = async () => {
    router.post(route('update.usermap'), props.data);
}
</script>
