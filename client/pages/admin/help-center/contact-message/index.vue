<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

definePageMeta({
  layout: "admin-layout",
});

const modal = useModalStore();

const { $listen, $unlisten, $uploads } = useNuxtApp();

const page = ref(1);
const search = ref("");
const categoryId = ref<null | number>(null);

const {
  result: contentData,
  pending,
  refresh,
} = await useGet("/help-center/content", {
  page,
  search,
  categoryId,
});

const reload = () => {
  refresh();
};
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
        class="rounded-xl overflow-hidden border overflow-x-scroll scrollbar-hide"
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
              v-if="contentData"
              v-for="(content, i) in contentData.content.data"
              :key="content.id"
            >
              <td>
                {{
                  (contentData.content.meta.current_page - 1) *
                    contentData.content.meta.per_page +
                  (i + 1)
                }}
              </td>
              <td class="flex items-center gap-2">
                {{ content?.title }}
              </td>
              <td>{{ content?.language?.name || "" }}</td>
              <td>{{ content?.category?.name || "" }}</td>
              <td>{{ Date.now() }}</td>

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
                      <button class="text-sm text-start p-1">
                        <!-- @click="modal.togel('deleteAdminUser', content.id)" -->
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
          :meta="contentData.content.meta"
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
