<template>
    <LoadingSpinner :class="!loading ? 'hidden' : ''" :message="$t('ui.loading_message')"/>

    <div class="h-full md:gap-6 md:grid">
        <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            {{ $t('templates.api_key_info') }}
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            {{ $t('templates.api_key_desc') }}
                        </p>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-gray-50 px-4 py-5">
                                <dt class="text-sm font-medium text-gray-500">
                                    <InputLabel for="car_number" value="Key"/>
                                    <div class="flex items-center">

                                        <TextInput
                                            id="uuid"
                                            type="text"
                                            class="mt-1 block w-96"
                                            v-model="form.value"
                                            required
                                        />

                                        <button v-on:click="generate" type="submit" class="w-36 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-500 ml-3 text-sm">
                                            {{ $t('buttons.generate') }}
                                        </button>
                                    </div>

                                </dt>
                            </div>

                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    <QRCodeVue3 v-if="form.value" :key="form.value"
                                        :width="200"
                                        :height="200"
                                        :value="form.value"
                                        :dotsOptions="{
                                        type: 'classy',
                                        color: '#000000',
                                        gradient: {
                                          type: 'linear',
                                          rotation: 0,
                                          colorStops: [
                                            { offset: 0, color: '#133e86' },
                                            { offset: 1, color: '#000000' },
                                          ],
                                        },
                                        }"
                                        :corners-square-options="{type: 'square'}"
                                    />
                                </dt>
                            </div>
                        </dl>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import QRCodeVue3 from "qrcode-vue3";
import { useForm } from '@inertiajs/vue3'
import {onMounted, ref} from "vue";
import axios from "axios";
import route from "ziggy-js";
import InputLabel from "../../Components/InputLabel.vue";
import TextInput from "../../Components/TextInput.vue";
import LoadingSpinner from "../../Components/LoadingSpinner.vue";

let loading = ref(false);
let form = useForm({value: ''});

const props = defineProps({
    data: Object,
    filters: Object
})

const generate = () => {
    axios.post(route('get.apikey'), {},{
            onUploadProgress: () => {
                loading.value = ! loading.value;
            },
            onDownloadProgress: () => {
                loading.value = ! loading.value;
            }
        },
    )   .then((response => {
        form.value = response.data;
    }))
        .catch((error) => {
        // console.log(error);
    });
}

onMounted(() => {
    form.value = props.data.value;
})
</script>
