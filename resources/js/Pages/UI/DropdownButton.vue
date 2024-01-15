<template>
    <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        class="text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button">
            <slot/>
        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
    </button>

    <div id="dropdownDivider" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
        <ul class="py-2 text-sm text-gray-700">
            <li>
                <div v-on:click="$emit('updatePeriod', 'today')" class="block cursor-pointer px-4 py-2 hover:bg-gray-100">{{ $t('ui.today') }}</div>
            </li>
            <li>
                <div v-on:click="$emit('updatePeriod', 'yesterday')" class="block cursor-pointer px-4 py-2 hover:bg-gray-100">{{ $t('ui.yesterday') }}</div>
            </li>
            <li>
                <div v-on:click="$emit('updatePeriod', 'week')" class="block cursor-pointer px-4 py-2 hover:bg-gray-100">{{ $t('ui.mount') }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "DropdownButton",
    emits: ['updatePeriod'],
}
</script>
