export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        setTrue(){
            this.$emit('update:show', true);
        },
    }
}
