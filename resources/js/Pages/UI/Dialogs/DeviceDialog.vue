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
                            {{ $t('devices.device_info') }}
                        </div>

                        <div>
                            <Avatar :src="spec.src" @update-src="updateSrc" :errors="$page.props.errors.photo"/>

                            <div class="mt-4">
                                <InputLabel for="name" :value="$t('users.user_name')"/>

                                <TextInput
                                    id="name"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.name"
                                    required
                                />

                                <InputErrorV2 :error="$page.props.errors.name"/>
                            </div>

                            <div class="mt-10">
                                <div class="grid grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel for="id_tracker" :value="$t('devices.device_id')"/>

                                        <TextInput
                                            v-if="form.uuid === ''"
                                            id="id_tracker"
                                            type="text"
                                            class="mt-1 block w-72"
                                            v-model="form.id_tracker"
                                            required
                                        />

                                        <div class="p-2 mt-1" v-else v-text="form.id_tracker"></div>

                                        <InputErrorV2 :error="$page.props.errors.id_tracker"/>
                                    </div>
                                    <div>
                                        <InputLabel for="group" :value="$t('devices.profession')"/>

                                        <SelectInput
                                            name="group" id="group"
                                            :options="options"
                                            :default="{id: 0, name: $t('ui.choose_group')}"
                                            v-model:value="form.group_id"
                                            class="mt-1 block w-72"/>

                                        <InputErrorV2 :error="$page.props.errors.group_id"/>
                                    </div>
                                </div>

                                <div class="mt-10 grid grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel for="car_number" :value="$t('devices.car_number')"/>
                                        <TextInput
                                            id="car_number"
                                            type="text"
                                            class="mt-1 block w-72"
                                            v-model="form.car_number"
                                            required
                                        />

                                        <InputErrorV2 :error="$page.props.errors.car_number"/>
                                    </div>
                                    <div>
                                        <InputLabel for="car_brand" :value="$t('devices.car_brand')"/>

                                        <TextInput
                                            id="car_model"
                                            type="text"
                                            class="mt-1 block w-72"
                                            v-model="form.car_model"
                                            required
                                        />

                                        <InputErrorV2 :error="$page.props.errors.car_model"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">

                        <div class="p-4">
                            <span class="ml-4 text-sm font-medium text-gray-700">Type:</span>
                            <div class="px-6 py-4 flex items-center gap-4">
                                <div>
                                    <input type="radio" id="car" name="device" value="car" v-model="form.type" />
                                    <label for="car"><img class="w-12 h-12" src="/images/car.png" alt="car"></label>
                                </div>

                                <div>
                                    <input type="radio" id="trucks" name="device" value="trucks" v-model="form.type" />
                                    <label for="trucks"><img class="w-12 h-12" src="/images/trucks.png" alt="trucks"></label>
                                </div>
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
                    </div>
        </form>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {reactive, watch} from "vue";
    import {useDialog} from "../../../Src/composables/useDialog";
    import InputLabel from "../../Components/InputLabel.vue";
    import TextInput from "../../Components/TextInput.vue";
    import Avatar from "../../Components/Avatar.vue";
    import SelectInput from "../../Components/SelectInput.vue";
    import InputErrorV2 from "../../Components/InputErrorV2.vue";

    let props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        options: Object,
        formData: Object,
        errors: Object
    })

    const emit = defineEmits(['update:show'])

    let state = { name: '', car_model: '', car_number: '', id_tracker: '', uuid: '', photo: null, group_id: 0, type: 'car' }
    let spec = reactive({option: null, src: null})

    let { form, isSubmit, submit, close } = useDialog('create.device', emit, state);

    watch(() => props.formData, (devicedata) => {
        for (const index in devicedata) {
            form[index] = devicedata[index];
        }

        spec.src = devicedata.src;
        spec.option = devicedata.group_id;
    })

    const updateSrc = (src = null, file = null) => {
        spec.src = src;
        form.photo = file;
    }

    watch(form, () => {
        if(form.uuid !== undefined && form.uuid === ''){
            spec.option = null;
            spec.src = null;
        }
    })

</script>


<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
