<template>
    <div class="relative">
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
            name="search"
            type="text"
            :placeholder="placeholder"
            class="bg-[#344670] w-96 rounded-md pl-3 pr-8 text-sm text-gray-100 focus:border-transparent focus:ring-0 outline-none focus:outline-none border border-transparent placeholder-gray-300"/>

        <button v-if="modelValue" v-on:click="clear" class="absolute right-2 top-2 hover:bg-gray-700 rounded-md">
            <IconCancel class="h-5 w-5 text-gray-400"/>
        </button>
    </div>

</template>

<script setup>
import IconCancel from "../UI/Svg/IconCancel.vue";
import {ref} from "vue";

defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    placeholder: String,
})

const input = ref(null);

const emit = defineEmits(['update:modelValue', 'clearSearch'])

const clear = () => {
    emit('clearSearch');
}
</script>
