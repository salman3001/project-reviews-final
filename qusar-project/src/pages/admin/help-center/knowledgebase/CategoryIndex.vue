<script setup lang="ts">
import { QTableProps } from 'quasar';
import SearchInput from 'src/components/forms/SearchInput.vue';
import { useGetTableData } from 'src/composables/useGetTableData';
import { AdditionalParams } from 'src/type';
import { exportCSV } from 'src/utils/exportCSV';
import { computed, reactive, ref } from 'vue';
import useModalStore from 'src/stores/useModalStore';
import { useRouter } from 'vue-router';
import { LanguageApi } from 'src/utils/BaseApiService';

const modal = useModalStore();
const router = useRouter();

const filter = reactive<AdditionalParams>({
  search: {
    name: '',
  },
  filter: {
    is_active: null,
    language_id: null,
  },
});

const search = computed({
  get() {
    return filter.search.name;
  },
  set(newValue) {
    filter.search.name = newValue;
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

const lanugageId = computed({
  get() {
    return filter.filter.language_id;
  },
  set(newValue) {
    filter.filter.language_id = newValue;
  },
});

const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  '/help-center/categories',
  {
    populate: {
      language: {
        fields: ['name', 'id'],
      },
    },
  }
);

const languages = ref<null | any[]>(null);
LanguageApi.index({
  fields: ['name', 'id'],
}).then(({ data }) => {
  languages.value = data.value;
});

const colomns: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
    sortable: true,
    style: 'min-width:500px;',
  },
  {
    name: 'language',
    field: (row) => row?.language?.name,
    label: 'Language',
    align: 'left',
  },
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
</script>

<template>
  <q-page class="row q-pa-lg">
    <div class="colomn q-gutter-y-lg" style="width: 100%">
      <div class="row justify-between q-gutter-y-sm">
        <SearchInput
          @search="
            (val) => {
              //@ts-ignore
              filter.search.name = val;
            }
          "
        />

        <div class="row q-gutter-sm">
          <q-select
            v-model="lanugageId"
            v-if="languages"
            dense
            options-dense
            emit-value
            map-options
            outlined
            :options="[{ label: 'All', value: null }, ...languages.map((r: any) => ({
              label: r.name,
              value: r.id,
            }))]"
            label="Languages"
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
                router.push({ name: 'admin.knowlegebase.category.create' });
              }
            "
            >+ Add Category</q-btn
          >
        </div>
      </div>
      <q-table
        ref="tableRef"
        flat
        bordered
        title="Categories"
        :loading="loading"
        :rows="data"
        :columns="colomns"
        class="zebra-table"
        v-model:pagination="pagination"
        :filter="filter"
        @request="onRequest"
        row-key="id"
        wrap-cells
      >
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
                      () => {
                        router.push({
                          name: 'admin.knowlegebase.category.show',
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
                          name: 'admin.knowlegebase.category.edit',
                          params: { id: props.row.id },
                        });
                      }
                    "
                  >
                    <q-item-section>
                      <q-item-label> <q-icon name="edit" /> Edit </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      modal.togel('deleteRecord', {
                        url: '/help-center/category/' + props.row.id,
                        tableRef,
                        title: 'Delete Category?',
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
