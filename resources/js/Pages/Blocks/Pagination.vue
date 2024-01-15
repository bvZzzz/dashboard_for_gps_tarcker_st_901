<template>
    <div class="mt-1 w-full bg-white py-3 rounded-lg shadow">
        <Component
            v-for="link in links"
            :is="link.url ? 'Link' : 'span'"
            :href="link.url"
            v-html="link.label"
            class="mx-1 px-4 py-2 "
            :class="{'font-medium bg-gray-100' : link.active, 'text-gray-700 transition-colors duration-300 transform rounded-md sm:inline hover:bg-gray-200 hover:text-black' : link.url }"
        />
    </div>
</template>

<script>
export default {
    name: "Pagination",

    props: {
        links: Array,
    }
}
</script>
