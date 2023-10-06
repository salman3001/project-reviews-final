<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

const modal = useModalStore();
const { $api, $event } = useNuxtApp();
const token = useCookie("token");
const roleId = toRef(modal?.meta?.currentRoleId)


const changeRole = async () => {
  try {
    const res = await $fetch($api + `/admin/admin-users/change-role/${modal?.meta?.userId}`, {
      headers: { Authorization: "Bearer" + " " + token.value },
      params: { roleId: roleId.value }
    });

    $event("user:RoleChanged")
    modal.show = false;
  } catch (error) {
    modal.show = false;
  }
};
</script>

<template>
  <div class="bg-base-200 px-4 py-2 flex justify-between items-center">
    <div>
      <h3 id="modal-title" class="text-lg font-bold">Change role</h3>
      <p id="modal-desc" class="text-xs">This action will change the user role</p>
    </div>
    <div>
      <label class="cursor-pointer btn btn-sm btn-square text-black bg-base-300" for="modal">X</label>
    </div>
  </div>
  <div id="modal-content" class="p-4">
    <form class="space-y-8 py-3 flex flex-col" @submit.prevent="changeRole">
      <div class="grid grid-cols-2 w-full place-items-start">

        <div class="form-control" v-if="modal.meta.roles" v-for="role in modal.meta.roles" :key="role.id">
          <label class="label cursor-pointer gap-2 justify-center">
            <input type="radio" name="roleId" class="radio checked:bg-primary" v-model="roleId" :value="role.id"
              :checked="roleId == role.id" />
            <span class="label-text">{{ role.name }}</span>
          </label>
        </div>

      </div>
      <div class="flex justify-end gap-4 w-full">
        <label class="cursor-pointer btn btn-sm min-w-[6rem] text-base-400 bg-base-200" for="modal">No</label>
        <button type="submit" class="btn btn-sm btn-primary min-w-[6rem]">
          Yes
        </button>
      </div>
    </form>
  </div>
</template>
