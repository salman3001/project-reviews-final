<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

definePageMeta({
    layout: "admin-layout",
});

const modal = useModalStore();

const { $listen, $unlisten } = useNuxtApp();

const page = ref(1);
const status = ref<'Open' | 'Closed' | 'Responded'>('Open');

const {
    result: tickets,
    pending,
    refresh,
} = await useGet("/help-center/support-ticket", {
    page,
    status
});

const reload = () => {
    refresh();
};

onMounted(() => {
    $listen("record:deleted", reload);
});

onUnmounted(() => {
    $unlisten("record:deleted", reload);
});
</script>
<template>
    <section class="my-8">

        <div class="pb-16 mt-8">
            <div class="tabs w-full pr-2 translate-y-0.5 bg-base-100">
                <div class="tab tab-lifted sm:w-24" :class="{ 'tab-active': status === 'Open' ? true : false }"
                    :style="{ borderTop: status === 'Open' ? '3px black solid' : '' }" @click="status = 'Open'">Open
                </div>
                <div class="tab tab-lifted sm:w-24" :class="{ 'tab-active': status === 'Responded' }"
                    :style="{ borderTop: status === 'Responded' ? '3px black solid' : '' }" @click="status = 'Responded'">
                    Responded</div>
                <div class="tab tab-lifted sm:w-24" :class="{ 'tab-active': status === 'Closed' }"
                    :style="{ borderTop: status === 'Closed' ? '3px black solid' : '' }" @click="status = 'Closed'">Closed
                </div>
                <div class="tab tab-lifted sm:w-24 flex-1"></div>
            </div>
            <div class="rounded-xl overflow-hidden border border-t-0 overflow-x-scroll scrollbar-hide pb-24">
                <table class="table table-zebra rounded-xl mt-4 min-w-7xl">
                    <thead>
                        <tr>
                            <th>SNo.</th>
                            <th>Title</th>
                            <th>User</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Updated At</th>
                            <th class="w-16">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="tickets" v-for="(ticket, i) in tickets.data" :key="ticket.id">
                            <td>
                                {{
                                    (tickets.meta.current_page - 1) *
                                    tickets.meta.per_page +
                                    (i + 1)
                                }}
                            </td>
                            <td class="flex items-center gap-2">
                                {{ ticket?.subject }}
                            </td>
                            <td>{{ ticket?.user?.name || "" }}</td>
                            <td>
                                <div v-if="ticket.status === 'Open'" class="badge badge-success badge-outline bg-base-200">
                                    Open
                                </div>
                                <div v-if="ticket.status === 'Closed'" class="badge badge-error badge-outline bg-base-200">
                                    Closed
                                </div>
                                <div v-if="ticket.status === 'Responded'"
                                    class="badge badge-secondary badge-outline bg-base-200">
                                    Responded
                                </div>
                            </td>
                            <td>{{ ticket?.created_at }}</td>
                            <td>{{ ticket?.updated_at || "" }}</td>

                            <td>
                                <div class="dropdown dropdown-bottom">
                                    <label tabindex="0"
                                        class="btn btn-primary font-normal text-white btn-sm normal-case w-max gap-1">
                                        Select an Options
                                    </label>
                                    <ul
                                        class="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black">
                                        <li>
                                            <NuxtLink class="text-sm p-1">View</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink class="text-sm p-1">Edit
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <button class="text-sm text-start p-1" @click="
                                                modal.togel('delete', {
                                                    apiUrl: '/help-center/support-ticket/' + ticket.id,
                                                    tostMessage: 'Ticket deleted',
                                                    modalTitle: 'Delete Ticket',
                                                })
                                                ">
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt-4 flex justify-end">
            <ClientOnly>
                <Pagination v-if="!pending" :meta="tickets.meta" @pageChange="(p) => {
                    page = p;
                }
                    " />
            </ClientOnly>
        </div>
    </section>
</template>
