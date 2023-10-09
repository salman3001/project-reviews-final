<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

definePageMeta({
  layout: "admin-layout",
});

const modal = useModalStore();

const { $listen, $unlisten } = useNuxtApp();

const page = ref(1);
const search = ref("");

const {
  result: messages,
  pending,
  refresh,
} = await useGet("/help-center/contact-message", {
  page,
  search,
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
  <section class="my-8 lg:my-14">
    <h1 class="text-3xl font-bold">Contact Message</h1>
    <div class="flex flex-wrap gap-4 justify-between mt-8">
      <div>
        <AdminSearchInput
          @search="
            (v) => {
              page = 1;
              search = v;
            }
          "
        />
      </div>
      <div class="flex gap-4 flex-wrap"></div>
    </div>
    <div class="pb-16 mt-8">
      <div
        class="rounded-xl overflow-hidden border overflow-x-scroll scrollbar-hide pb-16"
      >
        <table class="table table-zebra rounded-xl mt-4 min-w-7xl">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th class="w-16">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="messages"
              v-for="(message, i) in messages.data"
              :key="message.id"
            >
              <td>
                {{
                  (messages.meta.current_page - 1) * messages.meta.per_page +
                  (i + 1)
                }}
              </td>
              <td class="flex items-center gap-2">
                {{ message?.name }}
              </td>
              <td>{{ message?.email || "" }}</td>
              <td>{{ message?.message || "" }}</td>
              <td>{{ message?.created_at }}</td>

              <td>
                <div class="dropdown dropdown-bottom">
                  <label
                    tabindex="0"
                    class="btn btn-primary font-normal text-white btn-sm normal-case w-max gap-1"
                  >
                    Select an Options
                  </label>
                  <ul
                    class="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black"
                  >
                    <li>
                      <button
                        class="text-sm text-start p-1"
                        @click="
                          modal.togel('contactMessage', {
                            message: message?.message,
                            userName: message?.name,
                          })
                        "
                      >
                        View
                      </button>
                    </li>
                    <li>
                      <button
                        class="text-sm text-start p-1"
                        @click="
                          modal.togel('delete', {
                            apiUrl:
                              '/help-center/contact-message/' + message.id,
                            tostMessage: 'Message deleted',
                            modalTitle: 'Delete Message',
                          })
                        "
                      >
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
        <Pagination
          v-if="!pending"
          :meta="messages.meta"
          @pageChange="
            (p) => {
              page = p;
            }
          "
        />
      </ClientOnly>
    </div>
  </section>
</template>
