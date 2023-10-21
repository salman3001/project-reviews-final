<script setup lang="ts">
import { QTableProps } from 'quasar';
import { api } from 'src/boot/axios';
import SearchInput from 'src/components/forms/SearchInput.vue';
import { useGet } from 'src/composables/useGet';
import { TableRequestProps } from 'src/type';
import { computed, onMounted, ref, toValue, watchEffect } from 'vue';
import { useUrl } from 'vue-useurl';

const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 10,
});

const search = ref('');
const roleId = ref(null);
const status = ref(null);
const data = ref([]);
const loading = ref(false);

// const { data, loading, refresh } = useGet('admin-users', {
//   params: {
//     sortBy: pagination.value.sortBy,
//     descending: pagination.value.descending,
//     page: pagination.value.page,
//     rowsPerPage: pagination.value.rowsPerPage,
//     rowsNumber: pagination.value.rowsNumber,
//   },
// });

const onRequest = async (props: TableRequestProps) => {
  try {
    loading.value = true;
    const res = await api.get('admin-users', {
      params: {
        sortBy: props?.pagination.sortBy,
        descending: props?.pagination.descending,
        page: props?.pagination.page,
        rowsPerPage: props?.pagination.rowsPerPage,
      },
    });
    data.value = res?.data?.data;

    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

onMounted(() => {
  onRequest({
    pagination: pagination.value,
  });
});

const colomns: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  {
    name: 'name',
    field: (row: any) => row?.first_name + ' ' + row?.last_name,
    label: 'Name',
    align: 'left',
  },
  { name: 'role', field: (row: any) => row?.role?.name, label: 'Role' },
  { name: 'phone', field: 'phone', label: 'Phone', align: 'center' },
  {
    name: 'isActive',
    field: (row: any) => (row?.isActive === true ? 'Active' : 'Inactive'),
    label: 'Phone',
    align: 'left',
  },
];
</script>

<template>
  <q-page class="row q-pa-lg">
    <div class="colomn q-gutter-y-lg" style="width: 100%">
      <div class="row justify-between">
        <SearchInput />
        <div class="row q-gutter-sm">
          <q-select
            dense
            outlined
            v-model="roleId"
            :options="['sas', 'sas']"
            label="Role"
            class="col-auto"
            style="min-width: 8rem"
          />
          <q-select
            outlined
            dense
            v-model="status"
            :options="['sas', 'sas']"
            label="Status"
            class="col-auto"
            style="min-width: 8rem"
          />
          <q-btn color="primary">+Add User</q-btn>
        </div>
      </div>
      <q-table
        flat
        bordered
        v-if="data"
        title="Admin Users"
        :loading="loading"
        :rows="data"
        :columns="colomns"
        class="zebra-table"
        :pagination="pagination"
        @request="onRequest"
      >
        <template> </template>
      </q-table>
    </div>
  </q-page>
</template>
