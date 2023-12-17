<script setup lang="ts">
import { QTableProps, date } from 'quasar';
import { useGetTableData } from 'src/composables/useGetTableData';
import { AdditionalParams } from 'src/type';
import { exportCSV } from 'src/utils/exportCSV';
import { reactive } from 'vue';
import modalStore from 'src/stores/modalStore';
import { useRouter } from 'vue-router';

const modal = modalStore();
const { formatDate } = date
const router = useRouter();

const filter = reactive<AdditionalParams>({
  filter: {
    status: null,
  },
});


const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  '/help-center/support-ticket',
  {
    populate: {
      user: {
        fields: ['first_name', 'last_name'],
      },
    },
  }
);

const colomns: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  {
    name: 'subject',
    field: 'subject',
    label: 'Subject',
    align: 'left',
    style: 'max-width:300px;min-width:300px;',
  },
  {
    name: 'user',
    field: (row) => row?.user?.first_name + ' ' + row?.user?.last_name,
    label: 'User',
    align: 'left',
    style: 'width:8rem;',
  },
  {
    name: 'status',
    field: 'status',
    label: 'Status',
    align: 'center',
  },
  {
    name: 'created_at',
    field: (row: any) => formatDate(row?.created_at, 'DD-MM-YYYY HH:mm'),
    label: 'Date',
    align: 'center',
    style: 'min-width:150px'

  },
  {
    name: 'updated_at',
    field: (row: any) => formatDate(row?.updated_at, 'DD-MM-YYYY HH:mm'),
    label: 'Updated',
    align: 'center',
    style: 'min-width:150px'

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
        <div></div>
        <!-- <SearchInput
          @search="
            (val) => {
              //@ts-ignore
              filter.search.title = val;
            }
          "
        /> -->

        <div class="row q-gutter-sm">
          <q-select outlined dense options-dense emit-value map-options v-model="filter.filter.status" :options="[
            { label: 'All', value: null },
            { label: 'Open', value: 'Open' },
            { label: 'Closed', value: 'Closed' },
            { label: 'Responded', value: 'Responded' },
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
            router.push({ name: 'admin.supportTicket.create' });
          }
            ">+ Add Ticket</q-btn>
        </div>
      </div>
      <q-table ref="tableRef" flat bordered title="Suppor Tickets" :loading="loading" :rows="data" :columns="colomns"
        class="zebra-table" v-model:pagination="pagination" :filter="filter" @request="onRequest" row-key="id" wrap-cells>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <div>
              <q-badge v-if="props.row.status === 'Open'" color="positive" outline :label="props.value" />
              <q-badge v-if="props.row.status === 'Responded'" color="secondary" outline :label="props.value" />
              <q-badge v-if="props.row.status === 'Closed'" color="negative" outline :label="props.value" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-option="props">
          <q-td :props="props">
            <div class="">
              <q-btn-dropdown size="sm" color="primary" label="Options">
                <q-list dense>

                  <q-item clickable v-close-popup @click="
                    modal.togel('changeSupportTicketStatus', {
                      id: props.row.id,
                      status: props.row.status,
                      tableRef,
                      title: 'Change Ticket Status?',
                    })
                    ">
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="published_with_changes" /> Change Status</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="() => {
                    router.push({
                      name: 'admin.supportTicket.chat', params: {
                        id: props.row.id
                      }
                    })
                  }
                    ">
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="chat" /> Open Chat</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="
                    modal.togel('deleteRecord', {
                      url: '/help-center/support-ticket/' + props.row.id,
                      tableRef,
                      title: 'Delete Support ticket?',
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