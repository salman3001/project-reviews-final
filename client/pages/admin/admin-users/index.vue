<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

definePageMeta({
  layout: "admin-layout",
});

const modal = useModalStore();

const { $api } = useNuxtApp();
const token = useCookie("token");

const page = ref(1);
const search = ref("");
const roleId = ref<null | number>(null);
const isActive = ref<null | number>(null);

watchEffect(() => {
  console.log(roleId);
});

const { data, pending, refresh } = await useFetch($api + "/admin/admin-users", {
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
  params: {
    page,
    search,
    roleId,
    isActive,
  },
  transform: (data) => data as any,
  key: "admin-users",
});

console.log(toRaw(data.value));

const users: any[] = [];
</script>
<template>
  <section class="my-8 lg:my-14">
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
          name="roleId"
          v-model="roleId"
          @change="page = 1"
        >
          <option :value="null">All Roles</option>
          <option
            v-if="data"
            v-for="role in data.roles"
            :key="role.id"
            :value="role.id"
          >
            {{ role.name }}
          </option>
        </select>

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
        <a href="">
          <button class="btn btn-primary btn-sm">+ Add User</button>
        </a>
      </div>
    </div>
    <div class="overflow-x-scroll scrollbar-hide pb-16 mt-8">
      <table class="table table-zebra mt-6">
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="data" v-for="(user, i) in data.users.data" :key="user.id">
            <td>
              {{
                (data.users.meta.current_page - 1) * data.users.meta.per_page +
                (i + 1)
              }}
            </td>
            <td class="flex items-center gap-2">
              <div class="avatar">
                <div class="w-6 rounded-full ring-2">
                  <img src="" />
                </div>
              </div>
              {{ user.first_name + " " + user.last_name }}
            </td>
            <td>{{ user?.role ? user.role.name : "" }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.email }}</td>
            <td>
              <div
                v-if="user.is_active == 1"
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
                    <button class="text-sm text-start p-1" @click="">
                      Change Role
                    </button>
                  </li>
                  <li>
                    <button
                      class="text-sm text-start p-1"
                      @click="
                        modal.changeAdminStatus(user.id, () => {
                          refresh();
                        })
                      "
                    >
                      Ban User
                    </button>
                  </li>
                  <li><a href="" class="text-sm p-1">Edit User</a></li>
                  <li>
                    <button
                      class="text-sm text-start p-1"
                      @click="
                        modal.deleteAdminUser(user.id, () => {
                          refresh();
                        })
                      "
                    >
                      Delete User
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
          :meta="data.users.meta"
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
