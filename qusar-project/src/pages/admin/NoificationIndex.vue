<script setup lang="ts">
import { QTableProps, date } from 'quasar';
import { useGetTableData } from 'src/composables/useGetTableData';
import modalStore from 'src/stores/modalStore';
import { AdditionalParams } from 'src/type';
import { reactive } from 'vue';

const modal = modalStore();
const { formatDate } = date

const filter = reactive<AdditionalParams>({
  filter: {
    read_at: null
  },
});


const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  '/notifications'
);

const colomns: QTableProps['columns'] = [
  {
    name: 'data',
    field: (row: any) => row?.data?.message,
    label: 'Message',
    align: 'left',
    style: 'min-width:300px'
  },
  {
    name: 'created_at',
    field: (row: any) => formatDate(row?.created_at, 'DD-MM-YYYY HH:mm'),
    label: 'Date',
    align: 'center',
    style: 'min-width:150px;'

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

        <div class="row q-gutter-sm">
        </div>
      </div>
      <q-table ref="tableRef" flat bordered title="Notifications" :loading="loading" :rows="data" :columns="colomns"
        class="zebra-table" v-model:pagination="pagination" @request="onRequest" :filter="filter" row-key="id" wrap-cells>
        <template v-slot:body-cell-option="props">
          <q-td :props="props">
            <div class="">
              <q-btn-dropdown size="sm" color="primary" label="Options">
                <q-list dense>
                  <!-- <q-item
                    clickable
                    v-close-popup
                    @click="
                      () => {
                        router.push({
                          name: 'admin.knowlegebase.content.show',
                          params: { id: props.row.id },
                        });
                      }
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="visibility" /> View
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      () => {
                        router.push({
                          name: 'admin.knowlegebase.content.edit',
                          params: { id: props.row.id },
                        });
                      }
                    "
                  >
                    <q-item-section>
                      <q-item-label> <q-icon name="edit" /> Edit </q-item-label>
                    </q-item-section>
                  </q-item> -->
                  <q-item clickable v-close-popup @click="
                    modal.togel('deleteNotification', {
                      id: props.row.id,
                      tableRef,
                      title: 'Delete Notification?',
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
