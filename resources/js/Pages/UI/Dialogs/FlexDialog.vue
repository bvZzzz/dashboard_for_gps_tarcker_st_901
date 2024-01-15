<template>
    <div v-if="show" v-on:click.stop="close">
        <div class="bg-gray-900 bg-opacity-70 fixed inset-0 z-50">
            <div class="fixed flex inset-0 items-center justify-center overflow-x-hidden overflow-y-auto" aria-modal="true" role="dialog">
                <div class="max-w-lg mx-auto my-auto relative w-full">
                    <div class="bg-white relative rounded-lg shadow"  v-on:click.stop>
                        <button v-on:click="close" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">{{ $t("buttons.close") }}</span>
                        </button>
                        <div class="p-6 text-center">
                            <h3 class="mb-5 text-lg font-normal text-gray-500">
                                <slot name="header"/>
                            </h3>
                            <div>
                                <slot name="body"/>
                            </div>
                            <div>
                                <slot name="buttons"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FlexDialog',

    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },

    methods: {
        close(){
            this.$emit('update:show', false);
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
