<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});

const { result } = await useGet("/admin/roles");
</script>

<template>
  <section>
    <div class="mt-8 space-y-8">
      <h1 class="text-3xl font-bold">Roles and Permissions</h1>
      <div class="border rounded-2xl overflow-scroll">
        <table class="table table-zebra min-w-[30rem]">
          <thead>
            <tr>
              <th class="w-36">Role Name</th>
              <th>Permissions</th>
              <th class="w-36">Actions</th>
            </tr>

            <tr></tr>
          </thead>

          <tbody>
            <tr v-for="role in result.roles">
              <td>{{ role.name }}</td>
              <td class="">
                <div
                  v-if="role.name === 'Super Admin'"
                  class="badge bg-[#22C55E] gap-2"
                >
                  All Permissions
                </div>
                <div
                  v-else
                  class="badge bg-[#22C55E] gap-2 whitespace-nowrap"
                  v-for="permission in role?.permissions"
                >
                  {{ permission.name }}
                </div>
              </td>
              <td>
                <NuxtLink
                  :href="`/admin/roles/${role.id}/edit`"
                  class="btn btn-sm bg-base-100 text-base-400 border border-base-300 normal-case"
                >
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Edit</NuxtLink
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
