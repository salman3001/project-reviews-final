<script setup lang="ts">
import { QTableProps, date } from 'quasar';
import SearchInput from 'src/components/forms/SearchInput.vue';
import { useGetTableData } from 'src/composables/useGetTableData';
import { AdditionalParams } from 'src/type';
import { exportCSV } from 'src/utils/exportCSV';
import { onMounted, reactive, ref } from 'vue';
import modalStore from 'src/stores/modalStore';
import { useRouter } from 'vue-router';
import { interestApi } from 'src/utils/BaseApiService';
import ImportExcel from 'src/components/ImportExcel.vue';
import ExportExcel from 'src/components/ExportExcel.vue';

const modal = modalStore();
const router = useRouter();
const uploads = ref('');

const { formatDate } = date

const filter = reactive<AdditionalParams>({
  search: {
    first_name: '',
    last_name: '',
  },
  filter: {
    status: null,
  },
  relationFilter: {
    interests: {
      field: 'interest_id',
      value: '',
    }
  }
});


const interest = ref<null | any[]>(null)
interestApi.index({
  fields: ['name', 'id']
}).then(({ data }) => {
  interest.value = data.value
})

const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  'subscriber',
  {
    populate: {
      interests: {
        fields: ['name'],
      },
    },
  }
);

const colomns: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  {
    name: 'first_name',
    field: (row: any) => row?.first_name + ' ' + row?.last_name,
    label: 'Name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'phone',
    field: 'phone',
    label: 'Phone',
    align: 'left',
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'left',
  },
  {
    name: 'created_at',
    field: (row: any) => formatDate(row?.created_at, 'DD-MM-YYYY'),
    label: 'Subscribed Date',
    align: 'center'
  },
  {
    name: 'dob',
    field: (row: any) => formatDate(row?.dob, 'DD-MM-YYYY'),
    label: 'DOB',
    align: 'center'
  },
  {
    name: 'interests',
    field: (row: any) => row?.interests,
    label: 'Intrests',
    align: 'center',
    style: 'min-width:10rem;'
  },
  {
    name: 'status',
    field: (row: any) => (row?.status === 1 ? 'Active' : 'Inactive'),
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
          filter.search.first_name = val;
          //@ts-ignore
          filter.search.last_name = val;
        }
          " />
        <div class="row q-gutter-sm">
          <q-select v-model="filter.relationFilter.interests.value" v-if="interest" dense options-dense emit-value
            map-options outlined :options="[{ label: 'All', value: null }, ...interest.map((r: any) => ({
              label: r.name,
              value: r.id,
            }))]" label="Intrests" class="col-auto" style="min-width: 8rem" />
          <q-select outlined dense options-dense emit-value map-options v-model="filter.filter.status" :options="[
            { label: 'All', value: null },
            { label: 'Active', value: 1 },
            { label: 'Inactive', value: 0 },
          ]" label="Status" class="col-auto" style="min-width: 8rem" />
          <ImportExcel type="subscriber" />
          <ExportExcel type="subscriber" />
          <q-btn color="primary" @click="() => {
            router.push({ name: 'admin.subscriber.create' });
          }
            ">+ Add Subscriber</q-btn>
        </div>
      </div>
      <q-table ref="tableRef" flat bordered title="Subscribers" :loading="loading" :rows="data" :columns="colomns"
        class="zebra-table" v-model:pagination="pagination" :filter="filter" @request="onRequest" row-key="id">
        <template v-slot:body-cell-interests="props">
          <q-td :props="props">
            <div v-if="props.row.interests" class="row flex-wrap justify-center q-gutter-xs">
              <q-badge v-for="(int, idx) in props.value" color="positive" outline :label="int.name" :key="idx" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <div>
              <q-badge v-if="props.row.status" color="positive" outline :label="props.value" />
              <q-badge v-if="!props.row.status" color="secondary" outline :label="props.value" />
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
                      name: 'admin.subscriber.edit',
                      params: { id: props.row.id },
                    });
                  }
                    ">
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="edit" /> Edit</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="
                    modal.togel('deleteRecord', {
                      url: '/subscriber/' + props.row.id,
                      tableRef,
                      title: 'Delete Subscriber?',
                    })
                    ">
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="delete" /> Delete </q-item-label>
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
