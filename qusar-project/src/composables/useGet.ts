import { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { Ref, ref, toValue, watchEffect } from 'vue';

export const useGet = (
  url: string | Ref | (() => string),
  config: AxiosRequestConfig<any> | undefined
) => {
  const loading = ref(false);
  const data = ref([]);

  const fetchData = async (
    url: string | Ref | (() => string),
    config?: AxiosRequestConfig<any> | undefined
  ) => {
    try {
      loading.value = true;
      const res = await api.get(toValue(url), config);
      data.value = res.data;
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
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        Notify.create({ message: error.message, color: 'negative' });
      }
    }
  };

  watchEffect(async () => {
    fetchData(url);
  });

  const refresh = async (
    u?: string,
    config?: AxiosRequestConfig<any> | undefined
  ) => {
    if (u) {
      await fetchData(u, config);
    } else {
      await fetchData(url, config);
    }
  };

  return { data, loading, refresh };
};
