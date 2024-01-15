<template>
    <select
        @input="$emit('update:value', $event.target.value)"
        :value="value"
        class="shadow-sm text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md h-10 px-3">
        <option v-for="(option, index) in options" :value="option.id" :key="index" :disabled="index === 0 && value === index && dis">
            {{ option.name }}
        </option>
    </select>
</template>
<script>
export default {
    props: {
        value: "",
        options: Object,
        default: Object,
    },

    setup(props){
        let dis = props.default !== undefined && Object.keys(props.default).length;

        return { dis }
    },

    mounted() {
        if(this.$props.default !== undefined && Object.keys(this.$props.default).length > 0){
            this.$props.options.unshift(this.$props.default)
        }
    },
    unmounted() {
        if(this.$props.default !== undefined && Object.keys(this.$props.default).length > 0){
            this.$props.options.splice(0, 1);
        }
    }
}
</script>
