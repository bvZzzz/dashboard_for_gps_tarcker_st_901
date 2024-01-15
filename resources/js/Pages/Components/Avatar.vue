<template>
    <div class="flex justify-center items-center">
        <div class="text-center w-full">
            <div class="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                <div v-if="src">
                    <img :src="src" alt="user avatar" class="rounded-full">
                </div>
                <div v-else><IconProfile/></div>
            </div>
            <div class="mt-5 flex justify-center">
                <label for="photo" class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {{ $t('users.load') }}
                </label>

                <input @change="preview" class="sr-only" type="file" id="photo" accept=".jpg, .jpeg, .png, .webp">
            </div>
            <div class="py-2">
                <InputError class="mt-2" :message="errors" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import InputError from "./InputError.vue";
    import IconProfile from "../UI/Svg/IconProfile.vue";

    const props = defineProps({
        src: null,
        errors: null,
    })

    let emit = defineEmits(['updateSrc'])

    let preview = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = function () {
            emit('updateSrc', reader.result, file);
        };

        if (file){
            reader.readAsDataURL(file);
        }
    }
</script>
