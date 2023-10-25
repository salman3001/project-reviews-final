import { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { AdditionalParams } from 'src/type';
import { ref } from 'vue';

class BaseApiService {
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
        ...config,
      });
      if (res?.data) {
        data.value = res?.data;
      }
      loading.value = false;
    } catch (error) {
      loading.value = false;
      Notify.create({
        message: `Failed to fetch ${this.name}`,
        color: 'negative',
        icon: 'error',
      });
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
    } catch (error) {
      loading.value = false;
      Notify.create({
        message: `Failed to fetch ${this.name}`,
        color: 'negative',
        icon: 'error',
      });
    }

    return { loading, data };
  }

  public async post(data: any, config?: AxiosRequestConfig<any> | undefined) {
    const loading = ref(false);
    const execute = async () => {
      try {
        loading.value = true;
        const res = await api.post(this.url, data, config);
        loading.value = false;
        Notify.create({
          message: `${this.name} created successfully`,
          color: 'positive',
          icon: 'done',
        });
      } catch (error) {
        loading.value = false;
        Notify.create({
          message: `Failed to create ${this.name}`,
          color: 'negative',
          icon: 'error',
        });
      }
    };

    return {
      loading,
      execute,
    };
  }

  public async put(
    id: string,
    data: any,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    const loading = ref(false);
    const execute = async () => {
      try {
        loading.value = true;
        const res = await api.put(this.url + `/${id}`, data, config);
        loading.value = false;
        Notify.create({
          message: `${this.name} updated successfully`,
          color: 'positive',
          icon: 'done',
        });
      } catch (error) {
        loading.value = false;
        Notify.create({
          message: `Failed to update ${this.name}`,
          color: 'negative',
          icon: 'error',
        });
      }
    };

    return {
      loading,
      execute,
    };
  }

  public async delete(
    id: string,
    config?: AxiosRequestConfig<any> | undefined
  ) {
    const loading = ref(false);
    const execute = async () => {
      try {
        loading.value = true;
        const res = await api.delete(this.url + `/${id}`, config);
        loading.value = false;
        Notify.create({
          message: `${this.name} deleted successfully`,
          color: 'positive',
          icon: 'done',
        });
      } catch (error) {
        loading.value = false;
        Notify.create({
          message: `Failed to delete ${this.name}`,
          color: 'negative',
          icon: 'error',
        });
      }
    };

    return {
      loading,
      execute,
    };
  }
}

export const AdminUserApi = new BaseApiService('admin-users', 'User');
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
