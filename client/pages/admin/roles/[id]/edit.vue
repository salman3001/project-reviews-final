<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});

const route = useRoute();
const { $event } = useNuxtApp();

const { result: role } = await useGet(`/roles/${route.params.id}`, {
  populate: {
    permissions: {
      fields: ["name", "id"],
    },
  },
});
const { result: permissions } = await useGet(`/permissions`, {
  fields: ["name", "id"],
});

const selected = ref([...role.value.permissions.map((p) => p.id)]);

const upDate = async () => {
  const { error, result: res } = await usePut("/roles/" + route.params.id, {
    permissionId: selected.value,
  });

  if (res) {
    navigateTo("/admin/roles");
    $event("record:updated");
  }

  if (error) {
    $event("Fetch:error", {
      message: error?.message || "Something went wrong",
    });
  }
};
</script>

<template>
  <section class="mt-8 mb-16">
    <div class="flex items-center gap-4">
      <NuxtLink href="/admin/roles">
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
        <h1 class="text-2xl font-bold">Edit Role</h1>
        <p class="text-base-400 text-sm">Add or remove role permissions</p>
      </div>
    </div>
    <form class="mt-4" enctype="multipart/form-data" @submit.prevent="upDate">
      <div class="pt-2">
        <p class="text-xl font-semibold">{{ role.name }}</p>
      </div>
      <div class="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="permission in permissions"
          class="flex gap-2 justify-start items-center"
        >
          <input
            type="checkbox"
            :id="'check' + permission.id"
            class="checkbox checkbox-sm"
            name="permissionId"
            :value="permission.id"
            v-model="selected"
            :disabled="role.name === 'Super Admin'"
          />
          <label
            class="cursor-pointer text-black font-semibold"
            :for="'check' + permission.id"
            >{{ permission.name }}</label
          >
        </div>
      </div>

      <div class="flex justify-end mt-8 gap-8">
        <NuxtLink
          class="btn w-36 btn-sm text-base-400 bg-base-300"
          href="/admin/roles"
        >
          Cancle
        </NuxtLink>
        <button
          type="submit"
          class="btn w-36 btn-sm btn-primary"
          :disabled="role.name === 'Super Admin'"
        >
          Save
        </button>
      </div>
    </form>
  </section>
</template>
