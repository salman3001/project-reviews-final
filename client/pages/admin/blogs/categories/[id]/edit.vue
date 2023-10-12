<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});

const { $uploads, $event } = useNuxtApp();
const route = useRoute();

const { result: blogData } = await useGet(`/blogs/${route.params.id}/edit`);

const longDesc = ref(blogData?.value.blog?.long_desc || "");

const update = async (values: any) => {
  const formData = new FormData();
  Object.entries(values).map((val) => {
    formData.append(`${val[0]}`, values[val[0]]);
  });

  formData.append("longDesc", longDesc.value);
  const { result, error } = await usePut("/blogs/" + route.params.id, formData);
  if (result) {
    $event("record:created", { message: "Blog Updated" });
    navigateTo("/admin/blogs/blog-posts");
  }

  if (error) {
    $event("Fetch:error", {
      message: "Something Went wrong while updating blog",
    });
  }
};
</script>

<template>
  <section class="mt-8 mb-16">
    <div class="flex items-center gap-4">
      <NuxtLink href="/admin/blogs/blog-posts">
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
        <h1 class="text-2xl font-bold">Update Blog</h1>
        <p class="text-base-400 text-sm" id="click">Add Blog details</p>
      </div>
    </div>
    <FormKit
      type="form"
      #default="{ value }"
      @submit="update"
      :value="{
        title: blogData?.blog?.title,
        slug: blogData?.blog?.slug,
        shortDesc: blogData?.blog?.short_desc,
        metaTitle: blogData?.blog?.meta_title,
        metaKeywords: blogData?.blog?.meta_keywords,
        metaDesc: blogData?.blog?.meta_desc,
        languageId: blogData?.blog?.language_id,
        blogCategoryId: blogData?.blog?.category[0]?.id,
        isPublished: blogData?.blog?.is_published === 1,
      }"
    >
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <FormKit
          type="text"
          name="title"
          label="Title"
          :validation="[
            ['required'],
            ['unique', '/blogs/unique-title', blogData?.blog?.title],
          ]"
          :validation-messages="{
            unique: 'Title already Taken, Please change',
          }"
        />
        <FormKit
          type="text"
          name="slug"
          label="Slug"
          help="It will be autocreated if you dont add it"
          :validation="[
            ['slug'],
            ['unique', '/blogs/unique-slug', blogData?.blog?.slug],
          ]"
          :validation-messages="{
            unique: 'Slug already Taken, Please change',
            slug: 'Slug is Not Valid, Please remove white spaces',
          }"
        />
        <div class="md:col-span-2 lg:col-span-3">
          <FormKit
            type="textarea"
            name="shortDesc"
            label="Short Description"
            style="height: 7rem"
          />
        </div>
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
          name="blogCategoryId"
          label="Category"
          :options="[
            {
              value: null,
              label: 'Select Category',
            },
            ...blogData?.categories?.map((c) => ({
              value: c.id,
              label: c.name,
            })),
          ]"
        />
        <FormKit
          type="select"
          name="languageId"
          label="Language"
          :options="[
            {
              value: null,
              label: 'Select Language',
            },
            ...blogData?.languages?.map((c) => ({
              value: c.id,
              label: c.name,
            })),
          ]"
        />
        <div class="md:col-span-2 lg:col-span-3 py-4">
          <FormKit
            type="image"
            name="image"
            :url="
              blogData?.blog?.image?.url
                ? $uploads + blogData?.blog?.image?.url
                : '/dummy-thumb.jpg'
            "
          />
        </div>
        <ClientOnly>
          <div class="md:col-span-2 lg:col-span-3 mb-40 sm:mb-20 h-72">
            <label for="">Long Description</label>
            <QuillEditor
              v-model:content="longDesc"
              contentType="html"
              theme="snow"
              toolbar="full"
            />
          </div>
        </ClientOnly>
      </div>
      <div class="flex gap-2 mt-6">
        <label for="add">Publish</label>
        <FormKit id="add" type="checkbox" name="isPublished" />
      </div>
      <div class="py-4">
        <FormKitSummary />
        <FormKitMessages />
      </div>
      <div class="flex flex-wrap justify-end mt-8 gap-8">
        <NuxtLink
          class="btn w-36 btn-sm text-base-400 bg-base-300"
          href="/admin/blogs/blog-posts"
        >
          Cancle
        </NuxtLink>
        <button type="submit" class="btn w-36 btn-sm btn-primary">Save</button>
      </div>
    </FormKit>
  </section>
</template>
