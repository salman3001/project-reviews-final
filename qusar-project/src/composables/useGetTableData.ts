import { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { AdditionalParams } from 'src/type';
import { onMounted, ref } from 'vue';

interface RequestProps {
  pagination: {
    sortBy: string;
    descending: boolean;
    page: number;
    rowsPerPage: number;
  };
  filter?: any;
  getCellValue: (col: any, row: any) => any;
}

export const useGetTableData = (
  url: string,
  additionalPrams?: AdditionalParams,
  config?: AxiosRequestConfig<any> | undefined
) => {
  const loading = ref(false);
  const data = ref([]);
  const tableRef = ref();

  const pagination = ref({
    sortBy: 'id',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10,
  });

  const onRequest = async (props: RequestProps) => {
    const { page, rowsPerPage, sortBy } = props.pagination;
    console.log(props.pagination);

    const filter = props.filter;

    try {
      loading.value = true;
      const res = await api.get(url, {
        params: {
          sortBy: sortBy,
          page: page,
          rowsPerPage: rowsPerPage,
          ...filter,
          ...additionalPrams,
        },
        ...config,
      });

      data.value = res?.data?.data;
      pagination.value.sortBy = sortBy;
      pagination.value.page = res?.data?.meta?.current_page;
      pagination.value.rowsPerPage = res?.data?.meta?.per_page;
      pagination.value.rowsNumber = res?.data?.meta?.total;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      if (error?.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        Notify.create({
          message: error?.response?.data?.message,
          color: 'negative',
        });
      } else if (error?.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        Notify.create({ message: 'Server Not Reachable!', color: 'negative' });
      } else {
        // Something happened in setting up the request that triggered an Error
        Notify.create({ message: error.message, color: 'negative' });
      }
    }
  };

  onMounted(() => {
    tableRef.value && tableRef.value.requestServerInteraction();
  });

  return { data, loading, pagination, onRequest, tableRef };
};
