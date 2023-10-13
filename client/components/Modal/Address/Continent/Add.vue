<script setup lang="ts">
import useModalStore from "~/store/useModalStore";
import { reset } from "@formkit/core";

const modal = useModalStore();
const { $api, $event } = useNuxtApp();
const token = useCookie("token");

const add = async (values) => {
  try {
    const res = await $fetch($api + `/address/continents`, {
      method: "post",
      headers: { Authorization: "Bearer" + " " + token.value },
      body: {
        name: values.name,
      },
    });
    reset("addContinentForm");
    $event("record:created", { message: "Continent Added" });
    modal.show = false;
  } catch (error) {
    reset("addContinentForm");
    modal.show = false;
  }
};
</script>

<template>
  <div class="bg-base-200 px-4 py-2 flex justify-between items-center">
    <div>
      <h3 id="modal-title" class="text-lg font-bold">Add Continent</h3>
      <p id="modal-desc" class="text-xs">Add continent detail</p>
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
    <FormKit id="addContinentForm" type="form" class="py-3" @submit="add">
      <div class="py-8">
        <FormKit type="text" name="name" label="Name" validation="required" />
      </div>
      <div class="flex justify-end gap-4 w-full">
        <label
          class="cursor-pointer btn btn-sm min-w-[6rem] text-base-400 bg-base-200"
          for="modal"
          >Cancle</label
        >
        <button type="submit" class="btn btn-sm btn-primary min-w-[6rem]">
          Save
        </button>
      </div>
      <div class="py-2">
        <FormKitSummary />
        <FormKitMessages />
      </div>
    </FormKit>
  </div>
</template>
