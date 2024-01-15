<template>
    <LoadingSpinner :class="!loading ? 'hidden' : ''" :message="$t('ui.loading_message')"/>

    <div class="absolute right-32 top-5 z-30">
        <InputSearch @clear-search="clear" v-model="search" :placeholder="$t('users.search')"/>
    </div>
    <div class="relative">
        <div class="bg-gray-50 grid grid-cols-4 items-center py-1.5 rounded-t-md">
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('users.user_name') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('users.status') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('users.edit') }}
            </div>
            <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{  $t('users.active') }}
            </div>
        </div>

        <div class="bg-white divide-gray-200 divide-y min-w-full rounded-b-md">
            <div v-for="item in data.data" :key="item.uuid" class="grid grid-cols-4 hover:bg-gray-50">
                <div class="px-6 py-1.5 flex items-center">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-12 w-12">
                            <div>
                                <img v-if="item.photo" :src="item.photoUrl" alt="user avatar" class="h-12 w-12 rounded-full">

                                <div v-else>
                                    <IconProfile/>
                                </div>
                            </div>
                        </div>
                        <div class="ml-4">
                            <span class="text-sm font-medium text-gray-900">
                                {{ item.first_name }} {{ item.last_name }}
                            </span>
                            <div class="text-sm text-gray-500">
                                {{ item.email }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-6 py-1.5 flex items-center text-sm text-gray-500">
                    <span v-if="item.session.online" class="text-green-500 font-bold">{{  $t('templates.online') }}</span>
                    <span v-else class="text-red-500 font-bold">{{  $t('templates.offline') }}</span>
                </div>

                <div class="flex items-center gap-2">
                    <div>
                        <a v-on:click="editUser(item.uuid)" class="text-gray-600 hover:text-blue-500 cursor-pointer" title="Изменить данные">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                        </a>
                    </div>

                    <div>
                        <a v-on:click="editUserPassword(item.uuid)" class="text-gray-600 hover:text-blue-500 cursor-pointer" title="Изменить пароль">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                            </svg>
                        </a>
                    </div>

                    <div>
                        <a v-on:click="deleteUser(item.uuid)" class="text-gray-600 hover:text-red-500 cursor-pointer" title="Удалить">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="px-6 py-1.5 text-sm">
                    <div>
                        <span class="font-medium">{{ $t('templates.IP') }}:</span> {{ item.session.ip_address }}
                    </div>
                    <div>
                        <span class="font-medium">{{ $t('templates.platform_browser') }}:</span>
                        {{ item.session.platform }}
                            <span v-if="item.session.browser">-</span>
                        {{ item.session.browser }}
                    </div>
                    <div>
                        <span class="font-medium">{{ $t('templates.last_activity') }}:</span> {{ item.session.last_active }}
                    </div>
                </div>
            </div>

            <div v-if="data.data.length === 0" class="text-gray-500 p-4">{{ $t('ui.empty') }}</div>
        </div>
    </div>

    <Pagination v-if="data.links" :links="data.links"/>

    <transition name="fade">
        <UserDialog v-model:show="addUser"/>
    </transition>

    <transition name="fade">
        <UserPasswordDialog v-model:show="changePasswd" :uuid="uuid"/>
    </transition>

    <transition name="fade">
        <UserUpdateDialog v-model:show="changeUserData" :form-data="formData"/>
    </transition>
</template>

<script setup>
import route from "ziggy-js";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import UserDialog from "../../UI/Dialogs/UserDialog.vue";
import UserPasswordDialog from "../../UI/Dialogs/UserPasswordDialog.vue";
import UserUpdateDialog from "../../UI/Dialogs/UserUpdateDialog.vue";
import InputSearch from "../../Components/InputSearch.vue";
import Pagination from "../../Blocks/Pagination.vue";
import IconProfile from "../../UI/Svg/IconProfile.vue";
import LoadingSpinner from "../../Components/LoadingSpinner.vue";
import {useModal} from "../../../Src/composables/useModal";
import {useSearch} from "../../../Src/composables/useSearch";

const props = defineProps({
    data: Object,
    filters: Object
})

let addUser = ref(false),
    changePasswd = ref(false),
    changeUserData = ref(false);

let { uuid, loading, formData, editItem, deleteItem } = useModal();
let { search, clear } = useSearch('users', props.filters);
let { t } = useI18n();

const editUser = (uuid) => {
    editItem(route('user.data'), uuid, changeUserData)
}

const editUserPassword = (itemUuid) => {
    changePasswd.value = ! changePasswd.value;
    uuid = itemUuid;
}

const deleteUser = (uuid) => {
    deleteItem(route('delete.user', {"uuid": uuid}), t('users.confirm_delete'));
}

const modal = () => {
    addUser.value = ! addUser.value;
}

defineExpose({modal});
</script>
