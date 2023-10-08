<script setup lang="ts">

definePageMeta({
    layout: "admin-layout",
});

const content = ref('')



</script>

<template>
    <section class="mt-8 mb-16">

        <div class="flex items-center gap-4">
            <NuxtLink href="/admin/help-center/content">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </NuxtLink>
            <div class="flex flex-col items-center">
                <h1 class="text-2xl font-bold">Add Conetnt</h1>
                <p class="text-base-400 text-sm" id="click">Add content details</p>
            </div>
        </div>
        <FormKit type="form" #default="{ value }" @submit="createUser">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <FormKit type="text" name="title" label="Title" />
                <FormKit type="text" name="slug" label="Slug" help="It will be autocreated if you dont add it" />
                <FormKit type="select" name="categoryId" label="Category" :options="['fsfs', 'sdfsdf', 'sdfsdfd']" />
                <FormKit type="number" name="order" label="Order" />
                <ClientOnly>
                    <div class="md:col-span-2 lg:col-span-3 mb-40 sm:mb-20 h-72">
                        <label for="">Content</label>
                        <QuillEditor v-model:content="content" contentType="html" theme="snow" toolbar="full" />
                    </div>
                </ClientOnly>
            </div>
            <p class="text-xl font-semibold mt-6">META Information</p>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <FormKit type="text" name="metaTitle" label="Meta Title" />
                <FormKit type="text" name="metaKeywords" label="Meta Keywords" />
                <div class="md:col-span-2 lg:col-span-3">
                    <FormKit type="textarea" name="metaDec" label="Meta Description" rows="10" style="height: 10rem;" />
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
            <div class="flex flex-wrap   justify-end mt-8 gap-8">
                <NuxtLink class="btn w-36 btn-sm text-base-400 bg-base-300" href="/admin/admin-users">
                    Cancle
                </NuxtLink>
                <button type="submit" class="btn w-36 btn-sm btn-primary">Save</button>
            </div>
        </FormKit>
    </section>
</template>
