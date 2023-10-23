<script setup lang="ts">
import { QTableProps } from 'quasar';
import { useGetTableData } from 'src/composables/useGetTableData';
import useModalStore from 'src/stores/useModalStore';
import { useRouter } from 'vue-router';

const modal = useModalStore();
const router = useRouter();

const colomns: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  {
    name: 'name',
    field: 'name',
    label: 'Role Name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'permissions',
    field: (row) => row?.permission?.name,
    label: 'Permissions',
    align: 'left',
  },
  {
    name: 'option',
    field: (row: any) => row?.id,
    label: 'Options',
    align: 'center',
  },
];

const { data, loading, tableRef, onRequest, pagination } = useGetTableData(
  'roles',
  {
    populate: {
      permissions: {
        fields: ['*'],
      },
    },
  }
);
</script>

<template>
  <q-page class="row q-ma-lg">
    <div class="colomn q-gutter-y-lg" style="width: 100%">
      <q-table
        flat
        bordered
        ref="tableRef"
        title="Roles"
        :rows="data"
        :columns="colomns"
        :loading="loading"
        class="zebra-table"
        row-key="id"
        :pagination="pagination"
        @request="onRequest"
      >
        <template v-slot:body-cell-permissions="props">
          <q-td
            :props="props"
            class="row items-center"
            style="min-height: auto; min-width: 400px"
          >
            <div class="flex q-gutter-xs">
              <q-badge
                color="positive"
                size="30px"
                v-for="p in props.row.permissions"
                :key="p.id"
              >
                {{ p.name }}
              </q-badge>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-option="props">
          <q-td :props="props">
            <div class="">
              <q-btn-dropdown size="sm" color="primary" label="Options">
                <q-list dense>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      () => {
                        router.push({
                          name: 'admin.roles.edit',
                          params: { id: props.row.id },
                        });
                      }
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="edit" /> Edit User</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      modal.togel('deleteRecord', {
                        url: '/roles/' + props.row.id,
                        tableRef,
                        title: 'Delete Role?',
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
