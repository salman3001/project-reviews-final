<script setup lang="ts">
definePageMeta({
  layout: "admin-layout"
})

const roles: any[] = []
const users: any[] = []
</script>
<template>
  <section class="my-8 lg:my-14">
    <div class="flex flex-wrap gap-4 justify-between mt-8">
      <div>
        <AdminSearchInput />
      </div>
      <div class="flex gap-4 flex-wrap">
        <form id="role-form" action="">
          <select class="select select-bordered select-sm" onchange="document.getElementById('role-form').submit()"
            name="roleId">
            <option disabled selected>Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id" :selected="role.id == 1">{{ role.name }}
            </option>
          </select>
        </form>
        <form id='isActive-form' action="">
          <select class="select select-bordered select-sm" onchange="" name="isActive">
            <option disabled selected>Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </form>
        <a href="">
          <button class="btn btn-primary btn-sm">+ Add User</button>
        </a>
      </div>
    </div>
    <div class=" overflow-x-scroll scrollbar-hide pb-16 mt-8">
      <table class="table table-zebra mt-6 ">
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
          <tr v-if="users" v-for="(user, i ) in users" :key="users.id">
            <td>{{ (users.currentPage - 1) * users.perPage + (i + 1) }}</td>
            <td class="flex items-center gap-2">
              <div class="avatar ">
                <div class="w-6 rounded-full ring-2 ">
                  <img src="" />
                </div>
              </div>
              {{ user.firstName + " " + user.lastName }}
            </td>
            <td>{{ user?.role ? user.role.name : "" }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.email }}</td>
            <td>
              <div v-if="user.isActive == 1" class="badge badge-success badge-outline bg-base-200">Active</div>
              <div v-else class="badge badge-error badge-outline bg-base-200">Inactive</div>
            </td>
            <td>
              <div class="dropdown  dropdown-bottom">
                <label tabindex="0" class="btn btn-primary  font-normal text-white btn-sm normal-case w-max gap-1">
                  Select an Options
                </label>
                <ul class="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black">
                  <li>
                    <button class="text-sm text-start p-1">
                      Change Role
                    </button>
                  </li>
                  <li>
                    <button class="text-sm text-start p-1">
                      Ban User
                    </button>
                  </li>
                  <li><a href="" class="text-sm p-1">Edit User</a></li>
                  <li>
                    <button class="text-sm text-start p-1">Delete User</button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class=" mt-4 flex justify-end">
      peginate
    </div>
  </section>
</template>
