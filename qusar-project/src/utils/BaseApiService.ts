import { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { AdditionalParams } from 'src/type';
import { ref } from 'vue';

export class BaseApiService {
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

class AdminUserApiService extends BaseApiService {
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

class UserApiService extends BaseApiService {
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
export const userApi = new UserApiService('users', 'User');

export const RoleApi = new BaseApiService('roles', 'Role');
export const PermissionApi = new BaseApiService('permissions', 'Permission');
export const BlogApi = new BaseApiService('blogs', 'Blog');

export const blogCategoryApi = new BaseApiService(
  'blog-categories',
  'Blog Category'
);

export const LanguageApi = new BaseApiService('language', 'Language');
export const KnowledgebaseContentApi = new BaseApiService(
  '/help-center/content',
  'Content'
);
export const KnowledgebaseCategoryApi = new BaseApiService(
  '/help-center/categories',
  'Category'
);
export const ContactMessageApi = new BaseApiService(
  '/help-center/contact-message',
  'Contact Message'
);
export const SupportTickeApi = new BaseApiService(
  '/help-center/support-ticket',
  'Support Ticket'
);
export const ContinentsApi = new BaseApiService(
  '/address/continents',
  'Continent'
);

export const CountriesApi = new BaseApiService('/address/countries', 'Country');

export const StateApi = new BaseApiService('/address/states', 'State');

export const CityApi = new BaseApiService('/address/cities', 'City');

export const StreetApi = new BaseApiService('/address/streets', 'Street');

export const JobIndustryApi = new BaseApiService(
  '/job-industry',
  'Job Industry'
);

export const JobDepartmentApi = new BaseApiService(
  '/job-departments',
  'Job Department'
);

export const SocialApi = new BaseApiService('/social', 'Social Data');
class ProductApiService extends BaseApiService {
  public async deleteScreenShot(
    id: string,
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const data = ref(null);
    try {
      loading.value = true;
      const res = await api.get(
        this.url + '/delete-screenshot' + `/${id}`,
        config
      );
      if (res?.data) {
        data.value = res?.data;
      }
      cb?.onSuccess && cb.onSuccess();
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
}
export const productApi = new ProductApiService('/product', 'Product');
export const productCategoryApi = new BaseApiService(
  '/product-category',
  'Product Category'
);
export const productSubCategoryApi = new BaseApiService(
  '/product-subcategory',
  'Product Subcategory'
);
export const productTagApi = new BaseApiService('/product-tags', 'Product Tag');

class ServiceApiService extends BaseApiService {
  public async deleteScreenShot(
    id: string,
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const data = ref(null);
    try {
      loading.value = true;
      const res = await api.get(
        this.url + '/delete-screenshot' + `/${id}`,
        config
      );
      if (res?.data) {
        data.value = res?.data;
      }
      cb?.onSuccess && cb.onSuccess();
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
}

export const serviceApi = new ServiceApiService('/service', 'Service');
export const serviceCategoryApi = new BaseApiService(
  '/service-category',
  'Service Category'
);
export const serviceSubCategoryApi = new BaseApiService(
  '/service-subcategory',
  'Service Subcategory'
);
export const serviceTagApi = new BaseApiService('/service-tags', 'Service Tag');
export const templateApi = new BaseApiService('/template', 'Template');
export const campaignApi = new BaseApiService('/campaign', 'Campaign');
export const campaignTypeApi = new BaseApiService(
  '/campaign-type',
  'Campaign Type'
);
export const interestApi = new BaseApiService('/interest', 'Interest');
export const subscriberApi = new BaseApiService('/subscriber', 'Subscriber');

export const activityLogApi = new BaseApiService(
  '/admin-users/activities',
  'Activity Log'
);

class NotificationApiService extends BaseApiService {
  public deleteAllNotifcations(
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async () => {
      try {
        loading.value = true;
        const res = await api.delete(this.url + '/delete/all', config);
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

  public deleteReadNotifcations(
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async () => {
      try {
        loading.value = true;
        const res = await api.delete(this.url + 'delete/read', config);
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

  public async getUnread(
    query?: AdditionalParams,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    const loading = ref(false);
    const data = ref(null);
    try {
      loading.value = true;
      const res = await api.get(this.url + '/get-unread', {
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
}

export const notifcationApi = new NotificationApiService(
  '/notifications',
  'Notification'
);
