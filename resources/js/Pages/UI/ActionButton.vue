<template>
    <button class="w-32 bg-gray-800 border border-[#38569e] hover:bg-sky-500 hover:border-sky-600 flex items-center justify-center text-white active:text-blue-400 hover:bg-opacity-70 text-xs font-medium uppercase px-2 py-2 h-10 rounded outline-none focus:outline-none ease-linear transition-all duration-150">
        <slot/>
    </button>
</template>

<script>
export default {
    name: "ActionButton"
}
</script>
