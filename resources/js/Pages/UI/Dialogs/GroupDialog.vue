<template>
    <div v-if="show" class="fixed top-0 inset-x-0 px-4 pt-6 z-50 sm:px-0 sm:flex sm:items-top sm:justify-center">
        <div v-on:click="close"  class="fixed inset-0 transform transition-all">
            <div class="absolute inset-0 bg-gray-700 opacity-75"></div>
        </div>

        <div v-on:click.stop class="w-96">
            <div class="bg-white rounded-lg overflow-hidden shadow-xl transform w-full">
                <form @submit.prevent="submit">
                    <div class="px-6 py-4">
                        <div class="text-lg py-4">
                            {{ $t('groups.group_title') }}
                        </div>

                        <div>
                            <div>
                                <div class="py-2">
                                    <InputLabel for="name" :value="$t('groups.name')" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-full"
                                        v-model="form.value"
                                        required
                                        autofocus
                                    />

                                    <InputErrorV2 :error="$page.props.errors.value"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-6 py-4 text-right">
                        <button type="submit" :disabled="isSubmit" :class="isSubmit ? 'opacity-50' : ''" class="w-24 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-500 ml-3 text-sm">
                            {{ $t('buttons.save') }}
                        </button>

                        <button v-on:click="close" type="button" class="bg-white border border-gray-300 font-medium hover:bg-gray-50 ml-3 py-2 rounded-md shadow-sm text-gray-700 text-sm w-24">
                            {{ $t('buttons.cancel') }}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import InputError from "../../Components/InputError.vue";
    import InputLabel from "../../Components/InputLabel.vue";
    import TextInput from "../../Components/TextInput.vue";
    import {useDialog} from "../../../Src/composables/useDialog";
    import {watch} from "vue";
    import InputErrorV2 from "../../Components/InputErrorV2.vue";

    const emit = defineEmits(['update:show'])

    const { form, isSubmit, submit, close} = useDialog('create.group', emit, {value: '', uuid: ''});

    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        formData: Object,
    })

    watch(() => props.formData, data => {
        form.value = data.value;
        form.uuid = data.uuid;
    })
</script>

<script>
export default {
    name: "GroupDialog",
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
