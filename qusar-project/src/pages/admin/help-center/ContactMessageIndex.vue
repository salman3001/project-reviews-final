<script setup lang="ts">
import { QTableProps } from 'quasar';
import { useGetTableData } from 'src/composables/useGetTableData';
import { exportCSV } from 'src/utils/exportCSV';
import useModalStore from 'src/stores/useModalStore';

const modal = useModalStore();

const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  '/help-center/contact-message'
);

const colomns: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'left',
    style: 'width:8rem;',
  },
  {
    name: 'message',
    field: 'message',
    label: 'Message',
    align: 'left',
  },
  {
    name: 'created_at',
    field: 'created_at',
    label: 'Date',
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
        <div></div>

        <div class="row q-gutter-sm">
          <q-btn-dropdown
            outline
            label="Export"
            style="border: 1px solid lightgray"
          >
            <q-list dense>
              <q-item clickable v-close-popup @click="exportCSV(colomns, data)">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="receipt_long" /> Export CSV</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
      <q-table
        ref="tableRef"
        flat
        bordered
        title="Contact Messages"
        :loading="loading"
        :rows="data"
        :columns="colomns"
        class="zebra-table"
        v-model:pagination="pagination"
        @request="onRequest"
        row-key="id"
        wrap-cells
      >
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
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      modal.togel('deleteRecord', {
                        url: '/help-center/contact-message/' + props.row.id,
                        tableRef,
                        title: 'Delete Contact Message?',
                      })
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="delete" /> Delete</q-item-label
                      >
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
