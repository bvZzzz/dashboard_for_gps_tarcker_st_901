import {ref, watch} from "vue";
import {router} from "@inertiajs/vue3";

export function useSearch(page, filters) {
    let search = ref(filters.q ?? '');

    function clear() {
        search.value = '';
    }

    watch(search, () => {
        router.get('/settings/'+ page, { q: search.value }, {preserveState: true})
    }, { deep: true})

    return { search, clear }
}
