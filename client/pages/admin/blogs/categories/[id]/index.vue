<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});
const route = useRoute();
const { $uploads } = useNuxtApp();

const { result: Category } = await useGet(
  `/blog-categories/${route.params.id}`
);
</script>

<template>
  <section class="mt-8 mb-16">
    <div class="flex items-center gap-4">
      <NuxtLink href="/admin/blogs/categories">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </NuxtLink>
      <div class="flex flex-col">
        <h1 class="text-2xl font-bold">View Blogs Category</h1>
        <p class="text-base-400 text-sm text-start" id="click">
          Blog Category deatails
        </p>
      </div>
    </div>
    <div class="py-8">
      <h2 class="text-lg text-base-400 font-semibold">General Information</h2>
      <div class="overflow-x-scroll">
        <table class="table my-4 min-w-[40rem]">
          <thead>
            <tr class="font-semibold text-base-400">
              <th>Name</th>
              <th>Slug</th>
              <th>Language</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            <tr class="">
              <td>{{ Category?.name }}</td>
              <td>{{ Category?.slug }}</td>
              <td>{{ Category?.language?.name }}</td>
              <td>{{ Category?.order }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="my-6 space-y-4">
        <h2 class="text-base-400 font-semibold">SEO Detail</h2>
        <div class="flex gap-4 flex-wrap">
          <div class="max-w-[15rem]">
            <h2 class="text-sm text-base-400 font-semibold">Meta Title</h2>
            <p>{{ Category?.meta_title }}</p>
          </div>
          <div class="max-w-[15rem]">
            <h2 class="text-sm text-base-400 font-semibold">Meta Keywords</h2>
            <p>{{ Category?.meta_keywords }}</p>
          </div>
        </div>
        <div class="">
          <h2 class="text-sm text-base-400 font-semibold">Meta Description</h2>
          <p>{{ Category?.meta_desc }}</p>
        </div>
        <div class="">
          <h2 class="text-sm text-base-400 font-semibold">Status</h2>
          <p>{{ Category?.status === 1 ? "Active" : "Inactive" }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
