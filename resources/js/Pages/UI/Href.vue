<template>
    <Link :class="{'bg-blue-100 border-r-4 border-blue-400': active}" class="text-gray-700 border-r-4 border-gray-700 flex items-center py-2 px-8 text-gray-600 border-white hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
        <slot/>
    </Link>
</template>

<script>
export default {
    name: "Href",

    props: {
        active: {
            type: Boolean,
            default: false,
        }
    }
}
</script>
