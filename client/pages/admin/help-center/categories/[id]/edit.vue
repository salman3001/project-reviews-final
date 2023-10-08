<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});

const { $event } = useNuxtApp();
const route = useRoute();

const { result } = await useGet(
  `/help-center/categories/${route.params.id}/edit`
);

const update = async (values: any) => {
  const { result, error } = await usePut(
    "/help-center/categories/" + route.params.id,
    { ...values }
  );
  if (result) {
    $event("record:updated", { message: "Cetgory Updated" });
    navigateTo("/admin/help-center/categories");
  }

  if (error) {
    $event("Fetch:error", {
      message: "Something Went wrong while updating content",
    });
  }
};
</script>

<template>
  <section class="mt-8 mb-16">
    <div class="flex items-center gap-4">
      <NuxtLink href="/admin/help-center/categories">
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
        <h1 class="text-2xl font-bold">Add Category</h1>
        <p class="text-base-400 text-sm" id="click">Add Category details</p>
      </div>
    </div>
    <FormKit
      type="form"
      #default="{ value }"
      @submit="update"
      :value="{
        name: result?.category?.name,
        slug: result?.category?.slug,
        languageId: result?.category?.language_id,
        order: result?.category?.order,
        metaTitle: result?.category?.meta_title,
        metaKeywords: result?.category?.meta_keywords,
        metaDesc: result?.category?.meta_desc,
        isActive: result?.category?.is_active === 1,
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
              '/help-center/unique-category-name',
              result?.category?.name,
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
              '/help-center/unique-category-slug',
              result?.category?.slug,
            ],
          ]"
          :validation-messages="{
            unique: 'Slug already Taken, Please change',
          }"
        />
        <FormKit
          type="select"
          name="languageId"
          label="Language"
          :options="[
            ...result.languages?.map((c) => ({
              value: c.id,
              label: c.name,
            })),
          ]"
        />
        <FormKit
          type="number"
          name="order"
          label="Order"
          :validation="[
            [
              'unique',
              '/help-center/unique-category-order',
              result?.category?.order,
            ],
          ]"
          :validation-messages="{
            unique: 'This Order number is already taken',
            slug: 'Slug is Not Valid, Please remove white spaces',
          }"
        />
      </div>
      <p class="text-xl font-semibold mt-6">META Information</p>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <FormKit type="text" name="metaTitle" label="Meta Title" />
        <FormKit type="text" name="metaKeywords" label="Meta Keywords" />
        <div class="md:col-span-2 lg:col-span-3">
          <FormKit
            type="textarea"
            name="metaDesc"
            label="Meta Description"
            rows="10"
            style="height: 10rem"
          />
        </div>
      </div>
      <div class="flex gap-2 mt-6">
        <label for="add">Activate</label>
        <FormKit id="add" type="checkbox" name="isActive" />
      </div>
      <div class="py-4">
        <FormKitSummary />
        <FormKitMessages />
      </div>
      <div class="flex flex-wrap justify-end mt-8 gap-8">
        <NuxtLink
          class="btn w-36 btn-sm text-base-400 bg-base-300"
          href="/admin/help-center/categories"
        >
          Cancle
        </NuxtLink>
        <button type="submit" class="btn w-36 btn-sm btn-primary">Save</button>
      </div>
    </FormKit>
  </section>
</template>
