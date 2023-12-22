import { BaseApiClass } from './BaseApiClass';
import { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { AdditionalParams } from 'src/type';
import { ref } from 'vue';

class AdminUserApiService extends BaseApiClass {
  public updatePassword(
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async (id: string, data: any) => {
      try {
        loading.value = true;
        const res = await api.post(
          this.url + '/update-password/' + id,
          data,
          config
        );
        loading.value = false;
        cb?.onSuccess && cb?.onSuccess();
        Notify.create({
          message: 'Password updated successfully',
          color: 'positive',
          icon: 'done',
        });
      } catch (error: any) {
        if (error?.response) {
          loading.value = false;
          cb?.onError && cb?.onError();
          Notify.create({
            message:
              error?.response?.data?.message || 'Failed to update password',
            color: 'negative',
          });
        } else if (error?.request) {
          loading.value = false;
          cb?.onError && cb?.onError();
          Notify.create({
            message: 'Trying to update password .Server Not Reachable!',
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

  public async exportExcel(
    query?: AdditionalParams,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    const loading = ref(false);
    const data = ref(null);
    try {
      loading.value = true;
      const res = await api.get(this.url + '/export', {
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
            error?.response?.data?.message || `Failed to export ${this.name}`,
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

  public importExcel(
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async (id: string, data: any) => {
      try {
        loading.value = true;
        const res = await api.post(this.url + '/import', data, config);
        loading.value = false;
        cb?.onSuccess && cb?.onSuccess();
        // Notify.create({
        //   message: 'Password updated successfully',
        //   color: 'positive',
        //   icon: 'done',
        // });
      } catch (error: any) {
        if (error?.response) {
          loading.value = false;
          cb?.onError && cb?.onError();
          Notify.create({
            message: error?.response?.data?.message || 'Failed to Import Excel',
            color: 'negative',
          });
        } else if (error?.request) {
          loading.value = false;
          cb?.onError && cb?.onError();
          Notify.create({
            message: 'Trying to import excel .Server Not Reachable!',
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
}

export const AdminUserApi = new AdminUserApiService('admin-users', 'User');
