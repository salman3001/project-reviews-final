<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

definePageMeta({
  layout: "admin-layout",
});

const modal = useModalStore();

const { $listen, $unlisten, $uploads } = useNuxtApp();

const page = ref(1);
const search = ref("");
const status = ref<null | boolean>(null);
const languageId = ref<null | number>(null);

const { result, pending, refresh } = await useGet("/blog-categories", {
  page,
  search,
  status,
  languageId,
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
    <h1 class="text-3xl font-bold">Blog Categories</h1>
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
          name="status"
          v-model="status"
          @change="page = 1"
        >
          <option :value="null">Status</option>
          <option :value="true">Active</option>
          <option :value="false">Inactive</option>
        </select>
        <NuxtLink href="/admin/blogs/categories/create">
          <button class="btn btn-primary btn-sm">+ Add Category</button>
        </NuxtLink>
      </div>
    </div>
    <div class="overflow-x-scroll scrollbar-hide pb-16 mt-8 border rounded-xl">
      <table class="table table-zebra mt-6 p x-4">
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Name</th>
            <th>Language</th>
            <th>Status</th>
            <th class="w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="result"
            v-for="(category, i) in result.blogCategories.data"
            :key="category.id"
          >
            <td>
              {{
                (result.blogCategories.meta.current_page - 1) *
                  result.blogCategories.meta.per_page +
                (i + 1)
              }}
            </td>
            <td class="flex items-center gap-2">
              <div class="flex-1 min-w-[20rem]">
                {{ category?.name }}
              </div>
            </td>
            <td>{{ category?.language?.name }}</td>
            <td>
              <div
                v-if="category.status == 1"
                class="badge badge-success badge-outline bg-base-200"
              >
                Active
              </div>
              <div
                v-else
                class="badge badge-secondary badge-outline bg-base-200"
              >
                Inactive
              </div>
            </td>
            <td>
              <div class="dropdown dropdown-bottom">
                <label
                  tabindex="0"
                  class="btn btn-primary font-normal text-white btn-sm normal-case w-max gap-1"
                >
                  Options
                </label>
                <ul
                  class="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black"
                >
                  <li>
                    <NuxtLink
                      :href="`/admin/blogs/categories/${category.id}`"
                      class="text-sm p-1"
                      >view</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      :href="`/admin/blogs/categories/${category.id}/edit/`"
                      class="text-sm p-1"
                      >Edit</NuxtLink
                    >
                  </li>
                  <li>
                    <button
                      class="text-sm text-start p-1"
                      @click="
                        modal.togel('delete', {
                          apiUrl: '/blog-categories/' + category.id,
                          tostMessage: 'Category deleted',
                          modalTitle: 'Delete Blog Category',
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
    <div class="mt-4 flex justify-end">
      <ClientOnly>
        <Pagination
          v-if="!pending"
          :meta="result.blogCategories.meta"
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
