import { AdditionalParams, TableRequestProps } from 'src/type';
import { BaseApiClass } from './api/BaseApiClass';
import { Ref, ref } from 'vue';
import { AxiosRequestConfig } from 'axios';

export const onTableRequest = (
  api: BaseApiClass,
  pagination: Ref<{
    sortBy: string;
    descending: boolean;
    page: number;
    rowsPerPage: number;
    rowsNumber: number;
  }>,
  additionalPrams?: AdditionalParams,
  config?: AxiosRequestConfig
) => {
  const loading = ref(false);
  const rows = ref<any[]>([]);

  const onRequest = async (props: TableRequestProps) => {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    const filter = props.filter;
    loading.value = true;
    api
      .index(
        {
          sortBy: sortBy,
          page: page,
          descending: descending,
          rowsPerPage: rowsPerPage,
          ...filter,
          ...additionalPrams,
        },
        {
          ...config,
        }
      )
      .then(({ data }) => {
        loading.value = false;
        rows.value = (data?.value as any).data;
        pagination.value.page = (data?.value as any).meta?.current_page;
        pagination.value.rowsPerPage = (data?.value as any).meta?.per_page;
        pagination.value.rowsNumber = (data?.value as any).meta?.total;
        pagination.value.descending = descending;
        pagination.value.sortBy = sortBy;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  return {
    onRequest,
    loading,
    rows,
  };
};
