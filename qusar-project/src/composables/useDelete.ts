import { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

export const useDelete = (
  url: string,
  config: AxiosRequestConfig<any> | undefined
) => {
  const loading = ref(false);

  const trigger = async () => {
    try {
      loading.value = true;
      await api.delete(url, config);
      loading.value = false;
      Notify.create({
        message: 'Record Deleted',
        color: 'positive',
      });
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

  return { loading, trigger };
};
