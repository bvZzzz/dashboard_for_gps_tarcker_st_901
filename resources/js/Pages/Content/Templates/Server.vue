<template>
    <div class="h-full md:gap-6 md:grid">
        <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            {{ $t('server.info') }}
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            {{ $t('server.info_personal') }}
                        </p>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('server.ip') }}
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ data.server_ip }}
                                </dd>
                            </div>

                            <div class="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('server.port') }}
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ data.port }}
                                </dd>
                            </div>

                            <div class="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('server.host') }}
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ data.host }}
                                </dd>
                            </div>

                            <div class="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('server.status') }}
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span v-if="data.status" class="text-green-500 font-bold">{{ $t('templates.online') }}</span>
                                    <span v-else class="text-red-500 font-bold">{{ $t('templates.offline') }}</span>
                                </dd>
                            </div>

                            <div class="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    {{ $t('server.uptime') }}
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ data.uptime }}
                                </dd>
                            </div>

                            <div class="border-b border-t px-4 py-5 sm:px-6">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                    {{ $t('server.connections_list') }}
                                </h3>
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                    {{ $t('server.connections_list_info') }}
                                </p>
                            </div>
                            <div class="h-[360px] overflow-y-auto">
                                <div v-for="list in data.conn_list" class="px-2">
                                    <dd class="mt-1 text-sm text-gray-900 px-6 bg-gray-50 py-3 hover:bg-gray-100 rounded-md">
                                        {{ list.ip }}
                                    </dd>
                                </div>

                                <div v-if="data.conn_list.length === 0" class="px-6 py-2 text-gray-400">
                                    {{ $t('server.no_connections')}}
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: Object,
})
</script>
