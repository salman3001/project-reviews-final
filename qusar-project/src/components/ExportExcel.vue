<script setup lang="ts">
import { AdminUserApi } from 'src/utils/BaseApiService';
import { onMounted, ref } from 'vue';
const url = ref('')
const loading = ref(false)
const upload = ref('')

const creatExcel = () => {
  loading.value = true
  AdminUserApi.exportExcel().then(({ data }) => {
    url.value = upload.value + (data.value as any).url
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

onMounted(() => {
  upload.value = process.env.UPLOAD
})

</script>
<template>
  <a v-if="url" :href="url" target="_blank"><q-btn color="green-8">Download Excel</q-btn></a>
  <q-btn color="primary" v-else @click="creatExcel">Generate Excel</q-btn>
  <q-btn color="primary" v-if="loading">
    <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8" track-color="orange-2"
      style="min-width: 8rem" />
  </q-btn>
</template>
