<script setup lang="ts">
const prop = defineProps<{
  meta: {
    previous_page_url: string;
    next_page_url: string;
    per_page: number;
    current_page: number;
    total: number;
  };
}>();

// console.log(!meta.previous_page_url);
// console.log(!meta.next_page_url);
// console.log(meta.current_page);
// console.log(meta.total);
// console.log(meta.per_page);

const pages = () => {
  return Math.ceil(prop.meta.total / prop.meta.per_page);
};
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <button
      class="btn btn-square btn-xs text-black btn-outline border-base-300"
      :disabled="!meta.previous_page_url"
    >
      <a
        href=""
        @click.prevent="
          $emit('pageChange', Number(meta.previous_page_url.split('=')[1]))
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </a>
    </button>

    <a
      v-for="i in pages()"
      :key="i"
      href="#"
      class="btn btn-square btn-xs text-black btn-outline border-base-300"
      :class="{ 'btn-active': i === meta.current_page }"
      @click.prevent="$emit('pageChange', i)"
    >
      {{ i }}
    </a>
    <button
      class="btn btn-square btn-xs text-black btn-outline border-base-300"
      :disabled="!meta.next_page_url"
    >
      <a
        href="#"
        @click.prevent="
          $emit('pageChange', Number(meta.next_page_url.split('=')[1]))
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </a>
    </button>
  </div>
</template>
