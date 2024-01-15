<template>
    <div v-if="show" v-on:click.stop="close">
        <div class="bg-gray-900 bg-opacity-70 fixed inset-0 z-50">
            <div class="fixed flex inset-0 items-center justify-center overflow-x-hidden overflow-y-auto" aria-modal="true" role="dialog">
                <div class="max-w-lg mx-auto my-auto relative w-full">
                    <div class="bg-white relative rounded-lg shadow"  v-on:click.stop>
                        <button v-on:click="close" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">{{ $t("buttons.close") }}</span>
                        </button>
                        <div class="p-6 text-center">
                            <h3 class="mb-5 text-lg font-normal text-gray-500">
                                {{  $t('ui.select_date') }}
                            </h3>
                            <div>
                                <div class="flex items-center gap-4 py-2">
                                    <div class="flex items-center gap-3">
                                        {{ $t("ui.from") }} <DatePicker v-model="intervalStart" :format="format" :enable-time-picker="false" locale="ru" auto-apply/>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        {{ $t("ui.to") }} <DatePicker v-model="intervalEnd" :format="format" :enable-time-picker="false" locale="ru" auto-apply/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="w-full flex justify-end items-center gap-4 pt-6">
                                    <button type="button" v-on:click="getCoordsWithInterval"
                                            class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-6 py-2.5 text-center">
                                        {{ $t("buttons.show") }}
                                    </button>
                                    <button type="button" v-on:click="show = false"
                                            class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                        {{  $t("buttons.cancel") }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import DatePicker from '@vuepic/vue-datepicker';
import route from "ziggy-js";
import {onMounted, ref} from "vue";
import {router} from "@inertiajs/vue3";

let intervalEnd = ref(new Date());
let intervalStart = ref(new Date());

let props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:show']);

const close = () => {
    emit('update:show', false);
}

const format = (date) => {
    const day = date.getDate() < 9 ? '0'+date.getDate() : date.getDate();
    const month = date.getMonth() < 9 ? '0'+(date.getMonth()+1) : date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const getCoordsWithInterval = () => {
    let idTracker = location.pathname.match(/\d+$/gmu);

    router.get(route('dashboard', idTracker), {
        from: format(intervalStart.value),
        to: format(intervalEnd.value),

    }, {
        preserveState: true,
    })

    close();
}

const getCurrentInterval = () => {
    let params = new URLSearchParams(location.search);

    if(params.has('from') && params.has('to')){
        intervalStart = ref(format(new Date(params.get('from'))));
        intervalEnd = ref(format(new Date(params.get('to'))));
    }
}

onMounted(() => {
    getCurrentInterval();
})
</script>
