<script setup lang="ts">
const show = ref(false);
const target = ref(null);

onClickOutside(target, (event) => {
  show.value = !show.value;
});

defineProps<{
  position: "bottom" | 'right'
}>()



const togel = () => {
  show.value = !show.value
}


</script>

<template>
  <div class="relative">

    <slot name="button" :togel="togel">
      <label class="btn btn-ghost text-black btn-sm m-1 relative" @click="togel" @mouseover="togelHover"> </label>
    </slot>

    <ul
      class="shadow menu z-10 bg-base-100 rounded-box w-48 border-t-4 border-black absolute animate-fade animate-once animate-duration-500"
      :class="{
        'top-10': position === 'bottom',
        'translate-x-full right-0 top-0': position === 'right',

      }" v-if="show" ref="target">
      <slot :togel="togel">list here</slot>
    </ul>
  </div>
</template>
