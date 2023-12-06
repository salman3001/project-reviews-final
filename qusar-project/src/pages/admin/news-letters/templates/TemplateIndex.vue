<script setup lang="ts">
import { QTableProps } from 'quasar';
import SearchInput from 'src/components/forms/SearchInput.vue';
import { useGetTableData } from 'src/composables/useGetTableData';
import { AdditionalParams } from 'src/type';
import { exportCSV } from 'src/utils/exportCSV';
import { onMounted, reactive, ref } from 'vue';
import modalStore from 'src/stores/modalStore';
import { useRouter } from 'vue-router';

const modal = modalStore();
const router = useRouter()
const uploads = ref('');


const filter = reactive<AdditionalParams>({
  search: {
    name: '',
  },
});


const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  'template',
);


const colomns: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
    style: 'height:auto;',
  },
  {
    name: 'option',
    field: (row: any) => row?.id,
    label: 'Options',
    align: 'center',
  },
];

onMounted(() => {
  uploads.value = process.env.UPLOAD as string;
});
</script>

<template>
  <q-page class="row q-pa-lg">
    <div class="colomn q-gutter-y-lg" style="width: 100%">
      <div class="row justify-between q-gutter-y-sm">
        <SearchInput @search="(val) => {
          //@ts-ignore
          filter.search.name = val;
          //@ts-ignore
        }
          " />
        <div class="row q-gutter-sm">
          <q-btn-dropdown outline label="Export" style="border: 1px solid lightgray">
            <q-list dense>
              <q-item clickable v-close-popup @click="exportCSV(colomns, data)">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="receipt_long" /> Export CSV</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn color="primary" @click="() => {
            router.push({
              name: 'admin.template.create',
            })
          }
            ">+ Add Template</q-btn>
        </div>
      </div>

      <q-table ref="tableRef" flat bordered title="Templates" :loading="loading" :rows="data" :columns="colomns"
        class="zebra-table" v-model:pagination="pagination" :filter="filter" @request="onRequest" row-key="id">
        <template v-slot:body-cell-name="props">
          <q-td :props="props" class="row q-gutter-x-xs items-center">
            <div class="row items-center" style="flex-wrap: nowrap; max-width: 100%; min-width: 300px">
              <div style="
                  max-width: 110px;
                  min-width: 110px;
                  max-height: 70px;
                  display: flex;
                  padding: 5px;
                ">
                <img :src="props.row?.thumbnail?.url
                  ? uploads + props.row?.thumbnail?.url
                  : '/images/dummy-thumb.jpg'
                  " style="width: 100%; object-fit: cover" />
              </div>
              <div class="ellipsis-2-lines" style="text-overflow: ellipsis">
                {{ props.row.name }}
              </div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-option="props">
          <q-td :props="props">
            <div class="">
              <q-btn-dropdown size="sm" color="primary" label="Options">
                <q-list dense>
                  <q-item clickable v-close-popup @click="() => {
                    router.push({
                      name: 'admin.template.show',
                      params: { id: props.row.id }
                    })
                  }
                    ">
                    <q-item-section>
                      <q-item-label> <q-icon name="visibility" /> View</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="() => {
                    router.push({
                      name: 'admin.template.edit',
                      params: { id: props.row.id }
                    })
                  }
                    ">
                    <q-item-section>
                      <q-item-label> <q-icon name="edit" /> Edit</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="
                    modal.togel('deleteRecord', {
                      url: '/template/' + props.row.id,
                      tableRef,
                      title: 'Delete Template?',
                    })
                    ">
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="delete" />Delete</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
