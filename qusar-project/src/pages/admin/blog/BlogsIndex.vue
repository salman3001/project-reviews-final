<script setup lang="ts">
import { QTableProps } from 'quasar';
import SearchInput from 'src/components/forms/SearchInput.vue';
import { useGetTableData } from 'src/composables/useGetTableData';
import { AdditionalParams } from 'src/type';
import { exportCSV } from 'src/utils/exportCSV';
import { computed, reactive, ref } from 'vue';
import useModalStore from 'src/stores/useModalStore';
import { useRouter } from 'vue-router';
import { LanguageApi, blogCategoryApi } from 'src/utils/BaseApiService';

const modal = useModalStore();
const router = useRouter();
const uploads = ref('');

const filter = reactive<AdditionalParams>({
  populate: {
    language: {},
    category: {},
  },
  search: {
    title: '',
  },
  filter: {
    languageId: null,
    isPublished: null,
  },
  relationFilter: {
    category: {
      field: 'blog_category_id',
      value: '',
    },
  },
});

const isPublished = computed({
  get() {
    return filter.filter.isPublished;
  },
  set(newValue) {
    filter.filter.isPublished = newValue;
  },
});

const categoryId = computed({
  get() {
    return filter.relationFilter.category.value;
  },
  set(newValue) {
    filter.relationFilter.category.value = newValue;
  },
});

const languageId = computed({
  get() {
    return filter.filter.languageId;
  },
  set(newValue) {
    filter.filter.languageId = newValue;
  },
});

const categories = ref<null | Record<string, any>>(null);
blogCategoryApi.index().then(({ data }) => {
  categories.value = data.value;
});

const languages = ref<null | Record<string, any>>(null);
LanguageApi.index().then(({ data }) => {
  languages.value = data.value;
});

const { data, loading, onRequest, pagination, tableRef } = useGetTableData(
  'blogs',
  {
    populate: {
      category: {
        fields: ['name', 'id'],
      },
      language: {
        fields: ['name', 'id'],
      },
      image: {
        fields: ['url'],
      },
    },
  }
);

const colomns: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  {
    name: 'title',
    field: 'title',
    label: 'Title',
    align: 'left',
  },
  {
    name: 'language',
    field: (row: any) => row?.language?.name,
    label: 'Language',
    align: 'left',
  },
  {
    name: 'category',
    field: (row: any) => (row?.category ? row?.category[0]?.name : ''),
    label: 'Category',
    align: 'center',
  },
  { name: 'created_at', field: 'date', label: 'Date', align: 'center' },
  {
    name: 'is_published',
    field: (row: any) => (row?.is_published === 1 ? 'Published' : 'Draft'),
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
              filter.search.title = val;
              //@ts-ignore
            }
          "
        />

        <div class="row q-gutter-sm">
          <q-select
            v-model="categoryId"
            v-if="categories"
            dense
            options-dense
            emit-value
            map-options
            outlined
            :options="[{ label: 'All', value: null }, ...categories.map((r: any) => ({
            label: r.name,
            value: r.id,
          }))]"
            label="Category"
            class="col-auto"
            style="min-width: 8rem"
          />
          <q-select
            dense
            v-model="languageId"
            v-if="languages"
            options-dense
            emit-value
            map-options
            outlined
            :options="[{ label: 'All', value: null }, ...languages.map((r: any) => ({
            label: r.name,
            value: r.id,
          }))]"
            label="Language"
            class="col-auto"
            style="min-width: 8rem"
          />
          <q-select
            outlined
            dense
            options-dense
            emit-value
            map-options
            v-model="isPublished"
            :options="[
              { label: 'All', value: null },
              { label: 'Published', value: 1 },
              { label: 'Draft', value: 0 },
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
                router.push({ name: 'admin.blogs.create' });
              }
            "
            >+ Add blog</q-btn
          >
        </div>
      </div>
      <q-table
        ref="tableRef"
        flat
        bordered
        title="Blog Posts"
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
                  props.row?.image?.url
                    ? uploads + props.row?.image?.url
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
              {{ props.row.title }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-is_published="props">
          <q-td :props="props">
            <div>
              <q-badge
                v-if="props.row.is_published == 1"
                color="positive"
                outline
                :label="props.value"
              />
              <q-badge
                v-if="props.row.is_published == 0"
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
                          name: 'admin.blogs.edit',
                          params: { id: props.row.id },
                        });
                      }
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon name="edit" /> Edit Blog</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      modal.togel('deleteRecord', {
                        url: '/blogs/' + props.row.id,
                        tableRef,
                        title: 'Delete Blog?',
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
