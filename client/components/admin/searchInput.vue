<script setup lang="ts">
const search = ref("");
</script>

<template>
  <form
    id="search-from"
    class="relative"
    @submit.prevent="$emit('search', search)"
  >
    <span
      class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
      @click="$emit('search', search)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5 text-gray-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </span>
    <input
      class="input input-sm input-bordered"
      type="text"
      name="search"
      id="search"
      v-model="search"
    />
  </form>
</template>
