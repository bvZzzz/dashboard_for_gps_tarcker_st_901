<template>
    <div v-if="error" v-text="error" class="text-red-500 text-xs mt-1 px-1.5 w-72"></div>
</template>

<script>
export default {
    name: "InputErrorV2",
    props: {
        error: String
    }
}
</script>

<style scoped>

</style>
