import {router} from "@inertiajs/vue3";
import axios from "axios";
import {ref} from "vue";

export function useModal() {
    let uuid = null;
    let formData = ref({});
    let loading = ref(false);

    function showModal(form, uuidData = ''){
        form = true;
        uuid = uuidData;
    }

    function deleteItem(route, text){
        router.delete(route, {
            onBefore: () => {
                return confirm(text)
            },
            onError: (error) => {
                // console.log(error);
            }
        })
    }
    async function editItem(route, uuid, modal){
        const response = await axios.post(route, {
                uuid: uuid,
            },{
                onUploadProgress: () => {
                    loading.value = ! loading.value;
                },
                onDownloadProgress: () => {
                    loading.value = ! loading.value;
                }
            },
        ).catch((error) => {
            // console.log(error);
        });

        formData.value = response.data;
        modal.value = ! modal.value;
    }

    return { showModal, editItem, deleteItem, uuid, loading, formData }
}
