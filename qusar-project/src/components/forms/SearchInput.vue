<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>
<template>
  <q-input
    outlined
    v-model="text"
    placeholder="Search"
    dense
    class="gt-sm rounded-sm"
  >
    <template v-slot:append>
      <q-icon
        v-if="text !== ''"
        name="close"
        @click="text = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>
