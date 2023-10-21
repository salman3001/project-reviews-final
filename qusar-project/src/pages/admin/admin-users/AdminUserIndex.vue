<script setup lang="ts">
import { QTableProps } from 'quasar';
import SearchInput from 'src/components/forms/SearchInput.vue';
import { useGetTableData } from 'src/composables/useGetTableData';
import { AdditionalParams } from 'src/type';
import { ref } from 'vue';


const roleId = ref(null);
const status = ref(null);
const filter = ref<AdditionalParams>({
  populate: {
    role: {}
  },
  search: {
    first_name: "",
    last_name: ""
  }
})


const { data, loading, onRequest, pagination, tableRef } = useGetTableData('admin-users', {
  populate: {
    role: {
      fields: ["*"],
      populate: {
        AdminUser: {
          fields: ['*']
        }
      }
    }
  }
})



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
          <q-select dense outlined v-model="roleId" :options="['sas', 'sas']" label="Role" class="col-auto"
            style="min-width: 8rem" />
          <q-select outlined dense v-model="status" :options="['sas', 'sas']" label="Status" class="col-auto"
            style="min-width: 8rem" />
          <q-btn color="primary">+Add User</q-btn>
        </div>
      </div>
      <q-table ref="tableRef" flat bordered title="Admin Users" :loading="loading" :rows="data" :columns="colomns"
        class="zebra-table" v-model:pagination="pagination" :filter="filter" @request="onRequest">
        <template> </template>
      </q-table>
    </div>
  </q-page>
</template>
