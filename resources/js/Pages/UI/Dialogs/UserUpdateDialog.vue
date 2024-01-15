<template>
    <div v-if="show" class="fixed top-0 inset-x-0 px-4 pt-6 z-50 sm:px-0 sm:flex sm:items-top sm:justify-center">
        <div v-on:click="close" class="fixed inset-0 transform transition-all">
            <div class="absolute inset-0 bg-black opacity-70"></div>
        </div>

        <div v-on:click.stop class="w-96">
            <div class="bg-white rounded-lg overflow-hidden shadow-xl transform w-full">
                <form @submit.prevent="submit">
                    <div class="px-6 py-4">
                        <div class="text-lg py-4">
                            {{  $t('users.profile') }}
                        </div>

                        <div>
                            <Avatar :src="photo.src" @update-src="updateSrc" :errors="$page.props.errors.photo"/>

                            <div>
                                <div class="py-2">
                                    <InputLabel for="name" :value="$t('users.user_name')"/>

                                    <TextInput
                                        id="name"
                                        type="text"
                                        class="mt-1 block w-full"
                                        v-model="form.name"
                                        required
                                        autocomplete="name"
                                    />
                                    <InputErrorV2 :error="$page.props.errors.name"/>
                                </div>

                                <div class="py-2">
                                    <InputLabel for="email" :value="$t('users.email')" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        class="mt-1 block w-full"
                                        v-model="form.email"
                                        required
                                        autocomplete="username"
                                    />
                                    <InputErrorV2 :error="$page.props.errors.email"/>
                                </div>
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
    import InputErrorV2 from "../../Components/InputErrorV2.vue";

    const emit = defineEmits(['update:show'])

    const { form, isSubmit, submit, close} = useDialog('update.user', emit, { name: '', email: '', uuid: '', photo: null });

    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        formData: Object,
    })

    let photo = reactive({ src: null })

    watch(() => props.formData, (userdata) => {
        if (userdata){
            form.name = userdata.name;
            form.email = userdata.email;
            form.uuid = userdata.uuid;
            photo.src = userdata.src;
        }
    })

    const updateSrc = (src = null, file = null) => {
        photo.src = src;
        form.photo = file
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
