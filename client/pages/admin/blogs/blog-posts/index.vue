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
const isPublished = ref<null | number>(null);
const languageId = ref<null | number>(null);

const {
  result: blogData,
  pending,
  refresh,
} = await useGet("/blogs", {
  page,
  search,
  categoryId,
  isPublished,
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
    <h1 class="text-3xl font-bold">Blog Posts</h1>
    <div class="flex flex-wrap gap-4 justify-between mt-8">
      <div>
        <AdminSearchInput @search="(v) => {
            page = 1;
            search = v;
          }
          " />
      </div>
      <div class="flex gap-4 flex-wrap">
        <select class="select select-bordered select-sm" onchange="" name="roleId" v-model="categoryId"
          @change="page = 1">
          <option :value="null">All Categories</option>
          <option v-if="blogData" v-for="category in blogData.blogCategories" :key="category?.id" :value="category?.id">
            {{ category?.name }}
          </option>
        </select>

        <select class="select select-bordered select-sm" onchange="" name="isPublished" v-model="isPublished"
          @change="page = 1">
          <option :value="null">Status</option>
          <option value="1">Published</option>
          <option value="0">Draft</option>
        </select>
        <NuxtLink href="/admin/blogs/blog-posts/create">
          <button class="btn btn-primary btn-sm">+ Add Blog</button>
        </NuxtLink>
      </div>
    </div>
    <div class="overflow-x-scroll scrollbar-hide pb-16 mt-8 border rounded-xl">
      <table class="table table-zebra mt-6 p x-4">
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Title</th>
            <th>Language</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th class="w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="blogData" v-for="(blog, i) in blogData.blogs.data" :key="blog.id">
            <td>
              {{
                (blogData.blogs.meta.current_page - 1) *
                blogData.blogs.meta.per_page +
                (i + 1)
              }}
            </td>
            <td class="flex items-center gap-2">
              <div class="w-32">
                <img :src="blog?.image?.url
                      ? $uploads + blog?.image?.url
                      : '/dummy-thumb.jpg'
                    " class="w-full" />
              </div>
              <div class="flex-1 min-w-[20rem]">
                {{ blog?.title }}
              </div>
            </td>
            <td>{{ blog?.language?.name }}</td>
            <td class="">
              <div v-for="category in blog?.category" class="" :key="blog.id">
                {{ category?.name }}
              </div>
            </td>
            <td class="">
              {{ blog?.created_at }}
            </td>
            <td>
              <div v-if="blog.is_published == 1" class="badge badge-success badge-outline bg-base-200">
                Published
              </div>
              <div v-else class="badge badge-secondary badge-outline bg-base-200">
                Draft
              </div>
            </td>
            <td>
              <div class="dropdown dropdown-bottom">
                <label tabindex="0" class="btn btn-primary font-normal text-white btn-sm normal-case w-max gap-1">
                  Options
                </label>
                <ul class="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black">
                  <li>
                    <NuxtLink :href="`/admin/blogs/blog-posts/${blog.id}`" class="text-sm p-1">view</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :href="`/admin/blogs/blog-posts/${blog.id}/edit/`" class="text-sm p-1">Edit</NuxtLink>
                  </li>
                  <li>
                    <button class="text-sm text-start p-1" @click="
                      modal.togel('delete', {
                        apiUrl: '/blogs/' + blog.id,
                        tostMessage: 'Blog deleted',
                        modalTitle: 'Delete Blog',
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
    <div class="mt-4 flex justify-end">
      <ClientOnly>
        <Pagination v-if="!pending" :meta="blogData.blogs.meta" @pageChange="(p) => {
            page = p;
          }
          " />
      </ClientOnly>
    </div>
  </section>
</template>
