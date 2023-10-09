<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

const modal = useModalStore();
const { $api, $event } = useNuxtApp();
const token = useCookie("token");

const deleteUser = async () => {
  try {
    const res = await $fetch($api + `	/admin-users/${modal.meta}`, {
      headers: { Authorization: "Bearer" + " " + token.value },
      method: "DELETE",
    });
    $event("record:deleted");
    modal.show = false;
  } catch (error) {
    modal.show = false;
  }
};
</script>

<template>
  <div class="bg-base-200 px-4 py-2 flex justify-between items-center">
    <div>
      <h3 id="modal-title" class="text-lg font-bold">Delete User</h3>
      <p id="modal-desc" class="text-xs">This action cant not be undone</p>
    </div>
    <div>
      <label
        class="cursor-pointer btn btn-sm btn-square text-black bg-base-300"
        for="modal"
        >X</label
      >
    </div>
  </div>
  <div id="modal-content" class="p-4">
    <div
      id="deleteAdminUserForm"
      class="space-y-8 py-3 flex flex-col justify-center items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-20 h-20"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
      <p class="text-base-400 font-semibold">
        Do you want to delete this user?
      </p>
      <div class="flex justify-end gap-4 w-full">
        <label
          class="cursor-pointer btn btn-sm min-w-[6rem] text-base-400 bg-base-200"
          for="modal"
          >No</label
        >
        <button
          type="submit"
          class="btn btn-sm btn-primary min-w-[6rem]"
          @click="deleteHandeler"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>
