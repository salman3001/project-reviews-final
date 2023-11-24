<script setup lang="ts">
import { srollToView } from 'src/utils/scrollToView'
import editUserStore from 'src/stores/editUserStore';
import { onMounted } from 'vue';

const editUser = editUserStore()
const { execute, loading } = editUser.submitForm('languages')

onMounted(() => {
  editUser.getLangauges()
})
</script>

<template>
  <q-form class="column q-gutter-y-md" @submit="() => {
    execute()
  }" @validation-error="srollToView">
    <div class="column q-gutter-y-md">
      <div class="row q-col-gutter-md q-pb-lg" v-for="(w, i) in editUser.languagesForm.languages" :key="i">
        <div class="col-12 row q-col-gutter-sm items-center">
          <p class="text-grey">Language {{ i + 1 }}</p>
          <div>
            <q-btn v-if="i > 0" flat icon="delete" @click="() => editUser.popLanguage(i)">Remove
            </q-btn>
          </div>
        </div>
        <q-select outlined emit-value map-options v-model="w.language_id" :options="editUser.languages" label="Language"
          class="col-12 col-sm-6 col-md-3">
          <template v-slot:append>
            <q-icon v-if="i > 0" name="close" color="primary" @click="() => editUser.popLanguage(i)"
              :rules="[$rules.required('required')]" />
          </template>
        </q-select>
      </div>
      <div class="row justify-end">
        <q-btn color="primary" style="max-width: 14rem" size="small" @click="editUser.addNewLangauge">+ Add
          language</q-btn>
      </div>

      <div class="row justify-end q-gutter-md">
        <q-btn color="primary" v-if="loading">
          <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
            track-color="orange-2" style="min-width: 8rem" />
        </q-btn>
        <q-btn v-else color="primary" type="submit" style="min-width: 8rem">Update</q-btn>
      </div>
    </div>
  </q-form>
</template>
