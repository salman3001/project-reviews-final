import { BaseApiClass } from './BaseApiClass';
import { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
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
}

export const AdminUserApi = new AdminUserApiService('admin-users', 'User');
