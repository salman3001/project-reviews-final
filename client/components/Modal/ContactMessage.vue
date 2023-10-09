<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

const modal = useModalStore();
</script>

<template>
  <div class="bg-base-200 px-4 py-2 flex justify-between items-center">
    <div>
      <h3 id="modal-title" class="text-lg font-bold">Contact Message</h3>
      <p id="modal-desc" class="text-xs">Message Detail</p>
    </div>
    <div>
      <label
        class="cursor-pointer btn btn-sm btn-square text-black bg-base-300"
        for="modal"
        >X</label
      >
    </div>
  </div>
  <div id="modal-content" class="p-4 px-6">
    <div id="deleteAdminUserForm" class="space-y-8 py-3 flex flex-col">
      <div class="space-y-5">
        <p class="text-sm text-base-400 font-semibold">
          {{ modal.meta.userName }}
        </p>
        <p class="max-h-28 overflow-y-scroll">
          {{ modal.meta.message }}
        </p>
      </div>

      <div class="flex justify-end gap-4 w-full">
        <label
          class="cursor-pointer btn btn-sm btn-primary min-w-[6rem]"
          for="modal"
          >Close</label
        >
      </div>
    </div>
  </div>
</template>
