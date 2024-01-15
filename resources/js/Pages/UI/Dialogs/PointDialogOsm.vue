<template>
    <div v-if="show" class="fixed top-0 inset-x-0 px-4 pt-6 z-50 sm:px-0 sm:flex sm:items-top sm:justify-center">
        <div v-on:click="close" class="fixed inset-0 transform transition-all">
            <div class="absolute inset-0 bg-black opacity-70"></div>
        </div>

        <div>
            <div class="bg-white rounded-lg overflow-hidden shadow-xl transform w-full">
                    <form @submit.prevent="submit">
                        <div class="px-6 py-4">
                            <div class="text-lg py-4">
                                {{ $t('points.point_info') }}
                            </div>

                            <div class="flex gap-3">
                                <div class="mt-4">
                                    <InputLabel for="name" :value="$t('points.client')"/>

                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-72"
                                        v-model="form.client_name"
                                        required
                                    />

                                    <InputErrorV2 :error="$page.props.errors.client_name"/>
                                </div>

                                <div class="mt-4">
                                    <InputLabel for="name" :value="$t('points.crm_code')"/>

                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-72"
                                        v-model="form.crm_code"
                                        required
                                    />

                                    <InputErrorV2 :error="$page.props.errors.crm_code"/>
                                </div>
                            </div>

                            <div class="flex gap-3">
                                <div class="mt-4">
                                    <InputLabel for="name" :value="$t('points.address')"/>

                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-72"
                                        v-model="form.address"
                                        required
                                    />

                                    <InputErrorV2 :error="$page.props.errors.address"/>
                                </div>

                                <div class="mt-4">
                                    <InputLabel for="name" :value="$t('points.point_name')"/>

                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-72"
                                        v-model="form.point_name"
                                        required
                                    />

                                    <InputErrorV2 :error="$page.props.errors.point_name"/>
                                </div>
                            </div>

                            <div class="flex gap-3">
                                <div class="mt-4">
                                    <InputLabel for="name" :value="$t('points.longitude')"/>

                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-72"
                                        v-model="form.latitude"
                                        required
                                    />

                                    <InputErrorV2 :error="$page.props.errors.latitude"/>
                                </div>

                                <div class="mt-4">
                                    <InputLabel for="name" :value="$t('points.latitude')"/>

                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-72"
                                        v-model="form.longitude"
                                        required
                                    />

                                    <InputErrorV2 :error="$page.props.errors.longitude"/>
                                </div>
                            </div>

                            <div class="mt-4 map-box">
                                <MapOms @update:coordinates="setCoords" :latitude="form.latitude" :longitude="form.longitude" :map-zoom="zoom"/>
                            </div>
                        </div>

                        <div class="px-6 py-4 text-right">
                            <button type="submit" :disabled="isSubmit" :class="isSubmit ? 'opacity-50' : ''" class="w-24 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-500 ml-3 text-sm">
                                {{ $t('buttons.save') }}
                            </button>

                            <button v-on:click="close" type="button" class="mt-3 w-24 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 mt-0 ml-3 text-sm">
                                {{ $t('buttons.cancel') }}
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {useDialog} from "../../../Src/composables/useDialog";
    import {onBeforeUpdate, onUpdated, reactive, ref, watch} from "vue";
    import InputLabel from "../../Components/InputLabel.vue";
    import TextInput from "../../Components/TextInput.vue";
    import InputErrorV2 from "../../Components/InputErrorV2.vue";
    import MapOms from "../../Blocks/MapOsm.vue";

    const emit = defineEmits(['update:show'])

    let state = { client_name: '', address: '', point_name: '', latitude: 55.75, longitude: 37.62, crm_code: '', uuid: '' }
    let { form, isSubmit, submit, close } = useDialog('create.point', emit, state);

    let props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        options: Object,
        formData: Object,
        errors: Object,
        zoom: Number
    })

    watch(() => props.formData, (pointdata) => {
        for (const index in pointdata) {
            form[index] = pointdata[index];
        }
    })

    const setCoords = (e) => {
        form.latitude = e[0];
        form.longitude = e[1];
    }

    onBeforeUpdate(() => {
        if (localStorage.getItem('lat') !== null && localStorage.getItem('long') !== null && form.client_name === ''){
            form.latitude = localStorage.getItem('lat');
            form.longitude = localStorage.getItem('long');

            localStorage.removeItem('lat');
            localStorage.removeItem('long');
        }
    })

    onUpdated(() => {
        setTimeout(()=> {
            document.querySelectorAll('a[href*=leaflet]').forEach(e => {
                e.remove();
            })
        }, 100);
    })
</script>


<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.map-box {
    width: 100%;
    height: 400px;
}
.leaflet-pane {
    z-index: 0;
}
</style>
