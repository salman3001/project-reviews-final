<script setup lang="ts">
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import modalStore from 'src/stores/modalStore';
import { ref } from 'vue';

const modal = modalStore();
const loading = ref(false);

const handeler = async () => {
  try {
    loading.value = true;
    await api.delete(modal?.meta?.url, {});
    loading.value = false;
    Notify.create({ message: 'Record Deleted!', color: 'positive' });
    modal.meta.tableRef && modal.meta.tableRef.setPagination({}, true);
    modal.show = !modal.show;
  } catch (error: any) {
    loading.value = false;
    if (error?.response) {
      Notify.create({
        message: error?.response?.data?.message,
        color: 'negative',
      });
    } else if (error?.request) {
      Notify.create({ message: 'Server Not Reachable!', color: 'negative' });
      console.log(error.request);
    } else {
      Notify.create({ message: error.message, color: 'negative' });
    }
  }
};
</script>

<template>
  <q-card style="width: 100%">
    <q-toolbar style="background-color: #ebeae4">
      <q-toolbar-title><span class="text-weight-bold">{{
        modal.meta.title
      }}</span></q-toolbar-title>
      <q-btn flat dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section class="column items-center q-px-md-sm">
      <q-icon name="block" class="col-4" size="5rem" />
      <p>Are you sure, You want to delete this record?</p>
    </q-card-section>
    <q-card-section class="row justify-end">
      <div class="q-gutter-sm">
        <q-btn flat style="background-color: #f2f0dc" @click="modal.show = !modal.show">Cancle</q-btn>
        <q-btn color="primary" v-if="loading">
          <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
            track-color="orange-2" />
        </q-btn>
        <q-btn color="primary" @click="handeler" :disable="loading" v-else>Delete</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>
