<script setup lang="ts">
import { QTableProps } from 'quasar';
import SearchInput from 'src/components/forms/SearchInput.vue';
import { useGetTableData } from 'src/composables/useGetTableData';
import { AdditionalParams } from 'src/type';
import { exportCSV } from 'src/utils/exportCSV';
import { reactive, ref } from 'vue';
import modalStore from 'src/stores/modalStore';
import { ContinentsApi } from 'src/utils/BaseApiService';

const modal = modalStore();

const filter = reactive<AdditionalParams>({
  search: {
    name: '',
  },
  filter: {
    is_active: null,
  },
  relationFilter: {
    continent: {
      field: 'id',
      value: '',
    },
  },
});

const continents = ref<null | any[]>(null);
ContinentsApi.index({
  fields: ['name', 'id'],
}).then(({ data }) => {
  continents.value = data.value;
});

const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  'address/countries',
  {
    populate: {
      continent: {
        fields: ['name', 'id'],
      },
    },
  }
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
    name: 'continent',
    field: (row: any) => row?.continent?.name,
    label: 'Continent',
    align: 'left',
    style: 'height:auto;',
  },
  {
    name: 'is_active',
    field: (row: any) => (row?.is_active == 1 ? 'Active' : 'Inactive'),
    label: 'Status',
    align: 'center',
  },
  {
    name: 'option',
    field: (row: any) => row?.id,
    label: 'Options',
    align: 'center',
  },
];
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
          <q-select v-if="continents" outlined dense options-dense emit-value map-options
            v-model="filter.relationFilter.continent.value" :options="[
              { label: 'All', value: null },
              ...continents.map((c) => ({
                label: c?.name,
                value: c?.id,
              })),
            ]" label="Continent" class="col-auto" style="min-width: 8rem" />
          <q-select outlined dense options-dense emit-value map-options v-model="filter.filter.is_active" :options="[
            { label: 'All', value: null },
            { label: 'Active', value: 1 },
            { label: 'Inactive', value: 0 },
          ]" label="Status" class="col-auto" style="min-width: 8rem" />
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
              modal.togel('addCountry', { tableRef });
            }
            ">+ Add Country</q-btn>
        </div>
      </div>

      <q-table ref="tableRef" flat bordered title="Countries" :loading="loading" :rows="data" :columns="colomns"
        class="zebra-table" v-model:pagination="pagination" :filter="filter" @request="onRequest" row-key="id">
        <template v-slot:body-cell-is_active="props">
          <q-td :props="props">
            <div>
              <q-badge v-if="props.row.is_active == 1" color="positive" outline :label="props.value" />
              <q-badge v-if="props.row.is_active == 0" color="secondary" outline :label="props.value" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-option="props">
          <q-td :props="props">
            <div class="">
              <q-btn-dropdown size="sm" color="primary" label="Options">
                <q-list dense>
                  <q-item clickable v-close-popup @click="
                    modal.togel('editCountry', {
                      id: props.row?.id,
                      tableRef,
                    })
                    ">
                    <q-item-section>
                      <q-item-label> <q-icon name="edit" /> Edit</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="
                    modal.togel('deleteRecord', {
                      url: '/address/countries/' + props.row.id,
                      tableRef,
                      title: 'Delete Countriy?',
                    })
                    ">
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="delete" /> Delete</q-item-label>
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
