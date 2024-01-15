import route from "ziggy-js";
import {reactive, ref} from "vue";
import {router} from "@inertiajs/vue3";

export function useDialog(path, emit, obj = {}) {
    const before = {...obj};
    let form = reactive(obj);
    let isSubmit = ref(false);

    const submit = () => {
        router.post(route(path), form, {
            preserveState: (page) => Object.keys(page.props.errors).length,
            onStart: () => {
                isSubmit.value = true;
            },
            onError: (errors) => {
                if (! Object.keys(errors).length){
                    close();
                }

                isSubmit.value = false;
            }
        })
    }

    const clear = () => {
        for (const index in before) {
            form[index] = before[index];
        }
    }

    const close = () => {
        isSubmit.value = false;
        emit('update:show', false);

        clear();
    }

    return { form, isSubmit, submit, close }
}
