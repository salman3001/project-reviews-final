import { AxiosRequestConfig } from 'axios';
import qs from 'qs';
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
    data: any,
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async () => {
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
    id: string,
    data: any,
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async () => {
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
    id: string,
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async () => {
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

export const AdminUserApi = new BaseApiService('admin-users', 'User');

class UserApiService extends BaseApiService {
  public updatePassword(
    data: any,
    config?: AxiosRequestConfig<any> | undefined,
    cb?: { onSuccess?: () => void; onError?: () => void }
  ) {
    const loading = ref(false);
    const execute = async () => {
      try {
        loading.value = true;
        const res = await api.post(this.url + '/update-password', data, config);
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
export const productApi = new BaseApiService('/product', 'Product');
export const productCategoryApi = new BaseApiService(
  '/product-category',
  'Product Category'
);
export const productSubCategoryApi = new BaseApiService(
  '/product-subcategory',
  'Product Subcategory'
);
export const productTagApi = new BaseApiService('/product-tags', 'Product Tag');

export const serviceApi = new BaseApiService('/service', 'Service');
export const serviceCategoryApi = new BaseApiService(
  '/service-category',
  'Service Category'
);
export const serviceSubCategoryApi = new BaseApiService(
  '/service-subcategory',
  'Service Subcategory'
);
export const serviceTagApi = new BaseApiService('/service-tags', 'Service Tag');
