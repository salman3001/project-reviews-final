<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

definePageMeta({
  layout: "admin-layout",
});

const modal = useModalStore();

const { $listen, $unlisten } = useNuxtApp();

const page = ref(1);
const search = ref("");
const isActive = ref(null);

const {
  result: categorydata,
  pending,
  refresh,
} = await useGet("/help-center/categories", {
  page,
  search,
  isActive,
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
    <h1 class="text-3xl font-bold">Knowledge Base</h1>
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
      <div class="flex gap-4 flex-wrap">
        <select
          class="select select-bordered select-sm"
          onchange=""
          name="isActive"
          v-model="isActive"
          @change="page = 1"
        >
          <option :value="null">Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
        <NuxtLink href="/admin/help-center/categories/create">
          <button class="btn btn-primary btn-sm">+ Add Category</button>
        </NuxtLink>
      </div>
    </div>
    <div class="pb-16 mt-8">
      <div class="tabs w-full pr-2 translate-y-0.5 bg-base-100">
        <NuxtLink
          href="/admin/help-center/content"
          class="tab tab-lifted sm:w-24"
          >Content</NuxtLink
        >
        <NuxtLink
          href="/admin/help-center/categories"
          class="tab tab-lifted sm:w-24 tab-active"
          style="border-top: 3px black solid"
          >Categories</NuxtLink
        >
        <div class="tab tab-lifted sm:w-24 flex-1"></div>
      </div>
      <div
        class="rounded-xl overflow-hidden border border-t-0 overflow-x-scroll scrollbar-hide pb-24"
      >
        <table class="table table-zebra rounded-xl mt-4 min-w-7xl">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Title</th>
              <th>Language</th>
              <th>Status</th>
              <th class="w-16">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="categorydata"
              v-for="(category, i) in categorydata.categories.data"
              :key="category.id"
            >
              <td>
                {{
                  (categorydata.categories.meta.current_page - 1) *
                    categorydata.categories.meta.per_page +
                  (i + 1)
                }}
              </td>
              <td class="flex items-center gap-2">
                {{ category?.name }}
              </td>
              <td>{{ category?.language?.name || "" }}</td>
              <td>
                <div
                  v-if="category.is_active == 1"
                  class="badge badge-success badge-outline bg-base-200"
                >
                  Active
                </div>
                <div v-else class="badge badge-error badge-outline bg-base-200">
                  Inactive
                </div>
              </td>
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
                      <NuxtLink
                        :href="`/admin/help-center/categories/${category.id}`"
                        class="text-sm p-1"
                        >View</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink
                        :href="`/admin/help-center/categories/${category.id}/edit/`"
                        class="text-sm p-1"
                        >Edit
                      </NuxtLink>
                    </li>
                    <li>
                      <button
                        class="text-sm text-start p-1"
                        @click="
                          modal.togel('delete', {
                            apiUrl: '/help-center/categories/' + category.id,
                            tostMessage: 'Category deleted',
                            modalTitle: 'Delete Category',
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
          :meta="categorydata.categories.meta"
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
