<template>
    <transition name="list">
        <component :is="toasts[data.type]" v-model:show="data.message" :text="data.text"/>
    </transition>
</template>

<script setup>
import SuccessMessage from "./SuccessMessage.vue";
import ErrorMessage from "./ErrorMessage.vue";
import InfoMessage from "./InfoMessage.vue";
import {reactive} from "vue";
import {router, usePage} from "@inertiajs/vue3";

const toasts = {
    SuccessMessage,
    ErrorMessage,
    InfoMessage
}

const page = usePage();

let data = reactive({
    message: false,
    text: '',
    type: 'SuccessMessage'
})

router.on('finish', () => {
    if (page.props.toast){
        data.message = true;
        data.text = page.props.toast.message;
        data.type = page.props.toast.type;

        setTimeout(() => {
            data.message = false;
        }, 3000);
    }
})
</script>

<style scoped>

</style>
