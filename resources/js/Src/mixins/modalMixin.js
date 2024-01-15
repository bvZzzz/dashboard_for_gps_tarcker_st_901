import {router} from "@inertiajs/vue3";
import axios from "axios";

export default {
    data: () => {
        return {
            uuid: null,
            formData: {},
            loading: false,
        }
    },

    methods: {
        modal(form, uuid = ''){
            this[form] = true;
            this.uuid = uuid;
        },
        delete(route, text){
            router.delete(route, {
                onBefore: () => {
                    return confirm(text)
                },
                onError: (error) => {
                    // console.log(error);
                }
            })
        },
        edit(route, uuid, modal){
            axios.post(route, {
                uuid: uuid,
            },{
                onUploadProgress: () => {
                    this.loading = !this.loading;
                },
                onDownloadProgress: () => {
                    this.loading = !this.loading
                }
            },
            ).then((response) => {
                this[modal] = true;
                this.formData = response.data;
            }).catch((error) => {
                this.loading = false;
                // console.log(error);
            })
        }
    }
}
