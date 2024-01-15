import {ref} from "vue";
import {router} from "@inertiajs/vue3";

export default {
    props: {
        filters: Object,
    },

    data: (props) =>{
        return {
            search: ref(props.filters.q ?? ''),
        }
    },

    watch: {
        search(){
            router.get('/settings/'+this.page, { q: this.search }, {preserveState: true})
        }
    },

    methods: {
        clear(){
            this.$data.search = '';
        }
    }
}
