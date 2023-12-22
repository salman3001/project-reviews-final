<script setup lang="ts">
import { QFile } from 'quasar';
import { AdminUserApi } from 'src/utils/BaseApiService';
import { ref } from 'vue';

const form = ref({
  file: null
})

const input = ref<null | QFile>(null)


const { loading, execute } = AdminUserApi.importExcel()

const change = () => {
  if (input.value) {
    input.value?.pickFiles()
  }
}


</script>
<template>
  <q-form>
    <q-btn color="primary" v-if="loading">
      <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8" track-color="orange-2"
        style="min-width: 8rem" />
    </q-btn>
    <q-btn color="primary" v-else @click="change">Import Excel</q-btn>
    <q-file ref="input" accept="xlxs" v-model="form.file" style="display: none;" :rules="$rule.required">
    </q-file> </q-form>
</template>
