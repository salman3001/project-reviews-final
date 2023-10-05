<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

const modal = useModalStore();
</script>

<template>
  <div class="bg-base-200 px-4 py-2 flex justify-between items-center">
    <div>
      <h3 id="modal-title" class="text-lg font-bold">dgdg</h3>
      <p id="modal-desc" class="text-xs">gdgd</p>
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
    <form class="space-y-8 py-3 flex flex-col" id="changeRoleForm">
      <div class="grid grid-cols-2 w-full place-items-start">
        <!-- @each(role in roles) -->
        <div class="form-control">
          <label class="label cursor-pointer gap-2 justify-center">
            <!-- <input type="radio" name="roleId" class="radio checked:bg-primary"
          value={{ role.id }} {{ currentRole == role.id && "checked" }}
           />
          <span class="label-text">{{ role.name }}</span> -->
          </label>
        </div>
        <!-- @end -->
      </div>
      <div class="flex justify-end gap-4 w-full">
        <label
          class="cursor-pointer btn btn-sm min-w-[6rem] text-base-400 bg-base-200"
          for="modal"
          >No</label
        >
        <button type="submit" class="btn btn-sm btn-primary min-w-[6rem]">
          Yes
        </button>
      </div>
    </form>
  </div>
</template>
