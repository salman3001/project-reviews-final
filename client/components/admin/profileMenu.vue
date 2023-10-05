<script setup lang="ts">
import useAuthStore from "~/store/useAuthStroe";

const auth = useAuthStore();

const show = ref(false);
const target = ref(null);

onClickOutside(target, (event) => {
  show.value = !show.value;
});
</script>

<template>
  <div class="relative dropdown-bottom" @click="show = !show">
    <label tabindex="0" class="btn m-1 btn-circle">
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img src="~/assets/images/sample-dp.png" />
        </div>
      </div>
    </label>
    <ul
      class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black absolute animate-fade animate-once animate-duration-500 -left-20"
      v-if="show"
      ref="target"
    >
      <li>
        <a
          href="#"
          @click.prevent="
            () => {
              auth.adminLogout();
            }
          "
          >Logout</a
        >
      </li>
    </ul>
  </div>
</template>
