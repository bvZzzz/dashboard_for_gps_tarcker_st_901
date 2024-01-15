<template>
    <div class="absolute right-32 top-5 z-30">
        <InputSearch @clear-search="clear" v-model="search" :placeholder="$t('users.search')"/>
    </div>

    <div class="relative">
        <div class="bg-gray-50 grid grid-cols-4 items-center py-1.5 rounded-t-md">
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('blacklist.date') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('blacklist.ip') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('blacklist.request') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('blacklist.attempts') }}
            </div>
        </div>

        <div class="bg-white divide-gray-200 divide-y min-w-full rounded-b-md">
            <div v-for="item in data.data" class="grid grid-cols-4 hover:bg-gray-50 py-1.5">
                <div class="px-6 py-1.5 flex items-center">
                    <div class="flex items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                                {{ item.created_at }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-6 py-1.5 flex items-center text-sm text-gray-500">
                    <span class="text-sm font-medium text-gray-900">
                        {{ item.ip }}:{{ item.port }}
                    </span>
                </div>

                <div class="px-6 py-1.5 flex items-center text-sm text-gray-500">
                    <span class="text-sm font-medium text-gray-900">
                        {{ item.value }}
                    </span>
                </div>

                <div class="px-6 py-1.5 flex items-center text-sm text-gray-500">
                    <span class="text-sm font-medium text-gray-900">
                        {{ item.attempts }}
                    </span>
                </div>
            </div>

            <div v-if="data.data.length === 0" class="text-gray-500 p-4">{{ $t('ui.empty') }}</div>
        </div>
    </div>

    <Pagination v-if="data.links" :links="data.links"/>
</template>

<script setup>
import Pagination from "../../Blocks/Pagination.vue";
import InputSearch from "../../Components/InputSearch.vue";
import {useSearch} from "../../../Src/composables/useSearch";

const props = defineProps({
    data: Object,
    filters: Object
})

let { search, clear } = useSearch('blacklist', props.filters);
</script>
