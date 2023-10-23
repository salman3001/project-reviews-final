<script setup lang="ts">
import { QTableProps } from 'quasar';
import SearchInput from 'src/components/forms/SearchInput.vue';
import { useGet } from 'src/composables/useGet';
import { useGetTableData } from 'src/composables/useGetTableData';
import { AdditionalParams } from 'src/type';
import { exportCSV } from 'src/utils/exportCSV';
import { computed, onMounted, reactive, ref } from 'vue';
import useModalStore from 'src/stores/useModalStore';
import { useRouter } from 'vue-router';

const modal = useModalStore();
const router = useRouter();
const uploads = ref('');

const filter = reactive<AdditionalParams>({
  populate: {
    role: {},
    avatar: {},
  },
  search: {
    first_name: '',
    last_name: '',
  },
  filter: {
    roleId: null,
    is_active: null,
  },
});

const roleId = computed({
  get() {
    return filter.filter.roleId;
  },
  set(newValue) {
    filter.filter.roleId = newValue;
  },
});

const status = computed({
  get() {
    return filter.filter.is_active;
  },
  set(newValue) {
    filter.filter.is_active = newValue;
  },
});

const {
  data: roles,
  loading: rolesLoading,
  trigger: getRoles,
} = useGet('roles', {});

const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  'admin-users',
  {
    populate: {
      role: {
        fields: ['*'],
        populate: {
          AdminUser: {
            fields: ['*'],
            populate: {
              role: {
                fields: ['*'],
              },
            },
          },
        },
      },
      avatar: {
        fields: ['*'],
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
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'left',
  },
  {
    name: 'role',
    field: (row: any) => row?.role?.name,
    label: 'Role',
    align: 'center',
  },
  { name: 'phone', field: 'phone', label: 'Phone', align: 'center' },
  {
    name: 'is_active',
    field: (row: any) => (row?.is_active === 1 ? 'Active' : 'Inactive'),
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
  getRoles();
  uploads.value = process.env.UPLOAD as string;
});
</script>

<template>
  <q-page class="row q-pa-lg">
    <div class="colomn q-gutter-y-lg" style="width: 100%">
      <div class="row justify-between q-gutter-y-sm">
        <SearchInput
          @search="
            (val) => {
              //@ts-ignore
              filter.search.first_name = val;
              //@ts-ignore
              filter.search.last_name = val;
            }
          "
        />

        <div class="row q-gutter-sm">
          <q-select
            v-model="roleId"
            v-if="!rolesLoading"
            dense
            options-dense
            emit-value
            outlined
            :options="[{ label: 'All', value: null }, ...roles.map((r: any) => ({
            label: r.name,
            value: r.id,
          }))]"
            label="Role"
            class="col-auto"
            style="min-width: 8rem"
          />
          <q-select
            outlined
            dense
            options-dense
            emit-value
            map-options
            v-model="status"
            :options="[
              { label: 'All', value: null },
              { label: 'Active', value: 1 },
              { label: 'Inactive', value: 0 },
            ]"
            label="Status"
            class="col-auto"
            style="min-width: 8rem"
          />
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
          <q-btn
            color="primary"
            @click="
              () => {
                router.push({ name: 'admin.adminUsers.create' });
              }
            "
            >+ Add User</q-btn
          >
        </div>
      </div>
      <q-table
        ref="tableRef"
        flat
        bordered
        title="Admin Users"
        :loading="loading"
        :rows="data"
        :columns="colomns"
        class="zebra-table"
        v-model:pagination="pagination"
        :filter="filter"
        @request="onRequest"
        row-key="id"
      >
        <template v-slot:body-cell-first_name="props">
          <q-td :props="props" class="row q-gutter-x-xs items-center">
            <q-avatar size="30px">
              <img
                :src="
                  props.row?.avatar?.url
                    ? uploads + props.row?.avatar?.url
                    : '/images/sample-dp.png'
                "
                :style="{
                  border:
                    props.row.is_active === 1
                      ? '2px green solid'
                      : '2px red solid',
                }"
              />
            </q-avatar>
            <div>
              {{ props.row.first_name + ' ' + props.row.last_name }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-is_active="props">
          <q-td :props="props">
            <div>
              <q-badge
                v-if="props.row.is_active"
                color="positive"
                outline
                :label="props.value"
              />
              <q-badge
                v-if="!props.row.is_active"
                color="secondary"
                outline
                :label="props.value"
              />
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
                      modal.togel('changeRole', {
                        roles: roles,
                        id: props.row.id,
                        selectedRole: props?.row?.role?.id,
                        tableRef,
                      })
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="published_with_changes" /> Change
                        Role</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      modal.togel('changeAdminStatus', {
                        id: props.row.id,
                        tableRef,
                      })
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="highlight_off" />Ban User</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      () => {
                        router.push({
                          name: 'admin.adminUsers.edit',
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
                        url: '/admin-users/' + props.row.id,
                        tableRef,
                        title: 'Delete User?',
                      })
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="delete" /> Delete User</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      () => {
                        console.log('ran');
                      }
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="rowing" /> Activity log</q-item-label
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
