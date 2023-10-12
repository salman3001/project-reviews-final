<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});

const { $uploads, $event } = useNuxtApp();
const route = useRoute();

const { result: categoryData } = await useGet(
  `/blog-categories/${route.params.id}/edit`
);

const update = async (values: any) => {
  const formData = new FormData();
  Object.entries(values).map((val) => {
    formData.append(`${val[0]}`, values[val[0]]);
  });

  const { result, error } = await usePut(
    "/blog-categories/" + route.params.id,
    formData
  );
  if (result) {
    $event("record:updated", { message: "Blog Category Updated" });
    navigateTo("/admin/blogs/categories");
  }

  if (error) {
    $event("Fetch:error", {
      message: "Something Went wrong while updating blog category",
    });
  }
};
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
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold">Update Blog Category</h1>
        <p class="text-base-400 text-sm" id="click">
          Add Blog Category details
        </p>
      </div>
    </div>
    <FormKit
      type="form"
      #default="{ value }"
      @submit="update"
      :value="{
        name: categoryData?.category?.name,
        slug: categoryData?.category?.slug,
        order: categoryData?.category?.order,
        metaTitle: categoryData?.category?.meta_title,
        metaKeywords: categoryData?.category?.meta_keywords,
        metaDesc: categoryData?.category?.meta_desc,
        languageId: categoryData?.category?.language_id,
        status: categoryData?.category?.status === 1,
      }"
    >
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <FormKit
          type="text"
          name="name"
          label="Name"
          :validation="[
            ['required'],
            [
              'unique',
              '/blog-categories/unique-name',
              categoryData?.category?.name,
            ],
          ]"
          :validation-messages="{
            unique: 'Name already Taken, Please change',
          }"
        />
        <FormKit
          type="text"
          name="slug"
          label="Slug"
          help="It will be autocreated if you dont add it"
          :validation="[
            ['slug'],
            [
              'unique',
              '/blog-categories/unique-slug',
              categoryData?.category?.slug,
            ],
          ]"
          :validation-messages="{
            unique: 'Slug already Taken, Please change',
            slug: 'Slug is Not Valid, Please remove white spaces',
          }"
        />
        <FormKit
          type="number"
          name="order"
          label="Order"
          :validation="[
            [
              'unique',
              '/blog-categories/unique-order',
              categoryData?.category?.order,
            ],
          ]"
          :validation-messages="{
            unique: 'This Order number is already taken',
          }"
        />
        <FormKit type="text" name="metaTitle" label="Meta Title" />
        <FormKit type="text" name="metaKeywords" label="Meta Keywords" />
        <div class="md:col-span-2 lg:col-span-3">
          <FormKit
            type="textarea"
            name="metaDesc"
            label="Meta Desccription"
            style="height: 7rem"
          />
        </div>

        <FormKit
          type="select"
          name="languageId"
          label="Language"
          :options="[
            {
              value: null,
              label: 'Select Language',
            },
            ...categoryData?.languages?.map((c) => ({
              value: c.id,
              label: c.name,
            })),
          ]"
        />
      </div>
      <div class="flex gap-2 mt-6">
        <label for="add">Status</label>
        <FormKit id="add" type="checkbox" name="status" />
      </div>
      <div class="py-4">
        <FormKitSummary />
        <FormKitMessages />
      </div>
      <div class="flex flex-wrap justify-end mt-8 gap-8">
        <NuxtLink
          class="btn w-36 btn-sm text-base-400 bg-base-300"
          href="/admin/blogs/categories"
        >
          Cancle
        </NuxtLink>
        <button type="submit" class="btn w-36 btn-sm btn-primary">Save</button>
      </div>
    </FormKit>
  </section>
</template>
