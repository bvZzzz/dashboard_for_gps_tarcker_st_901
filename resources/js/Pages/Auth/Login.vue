<script setup>
import InputError from '../Components/InputError.vue';
import { useForm } from '@inertiajs/vue3';
import IconLogo from "../UI/Svg/IconLogo.vue";

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post('/login', {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head :title="$t('head.log_in')"></Head>

    <div class="lg:flex">
        <div class="lg:w-1/2 xl:max-w-screen-sm">
            <div class="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-24">
                <div class="cursor-pointer flex items-center">
                    <div>
                        <IconLogo/>
                    </div>
                    <div class="text-2xl text-indigo-700 tracking-wide ml-2 font-semibold">GeoSalut</div>
                </div>
            </div>

            <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
                {{ status }}
            </div>

            <div class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 class="text-sky-800 font-display font-semibold text-left text-4xl">{{ $t('ui.login_auth') }}</h2>
                <div class="mt-12">
                    <form @submit.prevent="submit">
                        <div class="relative z-0 mb-6 w-full group">
                            <input v-model="form.email" type="email" name="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " required autocomplete/>
                            <label for="floating_email" class="absolute text-sm text-gray-500 px-3 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {{$t('templates.email')}}
                            </label>
                            <InputError class="mt-2" :message="form.errors.email" />
                        </div>

                        <div class="relative z-0 mb-6 w-full group">
                            <input v-model="form.password" type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " required autocomplete/>
                            <label for="floating_password" class="absolute text-sm text-gray-500 px-3 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {{$t('templates.password')}}
                            </label>
                            <InputError class="mt-2" :message="form.errors.password" />
                        </div>

                        <button :class="{ 'opacity-25': form.processing }" :disabled="form.processing" class="mt-10 bg-sky-500 text-gray-100 p-4 w-full rounded-lg tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-sky-600 shadow-lg">
                            {{$t('buttons.login')}}
                        </button>

                    </form>
                </div>
            </div>
        </div>
        <div class="flex-1 h-screen hidden items-center justify-center lg:flex">
            <div class="cursor-pointer duration-200 hover:scale-110 transform">
                <img src="/images/auth.jpg" alt="auth logo">
            </div>
        </div>
    </div>
</template>
