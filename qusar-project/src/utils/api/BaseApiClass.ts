import { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { AdditionalParams } from 'src/type';
import { ref } from 'vue';

export class BaseApiClass {
  url: string;
  name: string;

  public constructor(url: string, name: string) {
    (this.url = url), (this.name = name);
  }

  public async index(
    query?: AdditionalParams,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    const loading = ref(false);
    const data = ref(null);
    try {
      loading.value = true;
      const res = await api.get(this.url, {
        params: {
          ...query,
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        ...config,
      });
      if (res?.data) {
        data.value = res?.data;
      }
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      if (error?.response) {
        Notify.create({
          message:
            error?.response?.data?.message || `Failed to fetch ${this.name}`,
          color: 'negative',
        });
      } else if (error?.request) {
        Notify.create({
          message: `Trying to fetch ${this.name}.Server Not Reachable!`,
          color: 'negative',
        });
      } else {
        Notify.create({ message: error.message, color: 'negative' });
      }
    }

    return { loading, data };
  }

  public async show(
    id: string,
    query?: AdditionalParams,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    const loading = ref(false);
    const data = ref(null);
    try {
      loading.value = true;
      const res = await api.get(this.url + `/${id}`, {
        params: {
          ...query,
        },
        ...config,
      });
      if (res?.data) {
        data.value = res?.data;
      }
      loading.value = false;
    } catch (error: any) {
      if (error?.response) {
        Notify.create({
          message:
            error?.response?.data?.message || `Failed to fetch ${this.name}`,
          color: 'negative',
        });
      } else if (error?.request) {
        Notify.create({
          message: `Trying to fetch ${this.name}.Server Not Reachable!`,
          color: 'negative',
        });
      } else {
        Notify.create({ message: error.message, color: 'negative' });
      }
    }

    return { loading, data };
  }

  public post(
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async (data: any) => {
      try {
        loading.value = true;
        const res = await api.post(this.url, data, config);
        loading.value = false;
        cb?.onSuccess && cb?.onSuccess();
        Notify.create({
          message: `${this.name} created successfully`,
          color: 'positive',
          icon: 'done',
        });
      } catch (error: any) {
        if (error?.response) {
          loading.value = false;
          cb?.onError && cb?.onError();
          Notify.create({
            message:
              error?.response?.data?.message || `Failed to create ${this.name}`,
            color: 'negative',
          });
        } else if (error?.request) {
          loading.value = false;
          cb?.onError && cb?.onError();
          Notify.create({
            message: `Trying to create ${this.name}.Server Not Reachable!`,
            color: 'negative',
          });
        } else {
          loading.value = false;
          cb?.onError && cb?.onError();
          Notify.create({ message: error.message, color: 'negative' });
        }
      }
    };

    return {
      loading,
      execute,
    };
  }

  public put(
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async (id: string, data: any) => {
      try {
        loading.value = true;
        const res = await api.put(this.url + `/${id}`, data, config);
        loading.value = false;
        cb?.onSuccess && cb?.onSuccess();
        Notify.create({
          message: `${this.name} updated successfully`,
          color: 'positive',
          icon: 'done',
        });
      } catch (error: any) {
        if (error?.response) {
          cb?.onError && cb?.onError();
          loading.value = false;
          Notify.create({
            message:
              error?.response?.data?.message || `Failed to updtae ${this.name}`,
            color: 'negative',
          });
        } else if (error?.request) {
          cb?.onError && cb?.onError();
          loading.value = false;
          Notify.create({
            message: `Trying to update ${this.name}.Server Not Reachable!`,
            color: 'negative',
          });
        } else {
          cb?.onError && cb?.onError();
          loading.value = false;
          Notify.create({ message: error.message, color: 'negative' });
        }
      }
    };

    return {
      loading,
      execute,
    };
  }

  public delete(
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async (id: string) => {
      try {
        loading.value = true;
        const res = await api.delete(this.url + `/${id}`, config);
        loading.value = false;
        cb?.onSuccess && cb?.onSuccess();
        Notify.create({
          message: `${this.name} deleted successfully`,
          color: 'positive',
          icon: 'done',
        });
      } catch (error: any) {
        if (error?.response) {
          cb?.onError && cb?.onError();
          loading.value = false;
          Notify.create({
            message:
              error?.response?.data?.message || `Failed to delete ${this.name}`,
            color: 'negative',
          });
        } else if (error?.request) {
          cb?.onError && cb?.onError();
          loading.value = false;
          Notify.create({
            message: `Trying to delte ${this.name}.Server Not Reachable!`,
            color: 'negative',
          });
        } else {
          cb?.onError && cb?.onError();
          loading.value = false;
          Notify.create({ message: error.message, color: 'negative' });
        }
      }
    };

    return {
      loading,
      execute,
    };
  }
}
