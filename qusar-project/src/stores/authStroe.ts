import { defineStore } from 'pinia';
import { Cookies, Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = defineStore('Auth', () => {
  const user = Cookies.get('user');

  const setUser = (payload: any) => {
    Cookies.set('user', payload, {
      expires: 1,
    });
  };

  const setToken = (payload: any) => {
    Cookies.set('token', payload, {
      expires: 1,
    });
  };

  const adminLogin = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      const res = await api.post('/auth/admin-login', {
        email,
        password,
      });

      setUser(res?.data?.user);
      setToken(res?.data?.token?.token);
      router.push({
        name: 'adminDashboard',
      });
      Notify.create({ message: 'Login Successfull!', badgeColor: 'positive' });
    } catch (error: any) {
      Notify.create({ message: 'Login Failed!', badgeColor: 'red' });
    }
  };

  const adminLogout = async () => {
    console.log('ran');

    try {
      await api.get('/auth/admin-logout');
      setUser(null);
      setToken(null);
      router.push({ name: 'admin.login' });
    } catch (error: any) {
      Notify.create({
        message: 'Opps Something went wrong!',
        badgeColor: 'negative',
      });
    }
  };

  const hasRole = (name: string) => {
    if (user) {
      const u = JSON.parse(user);
      return u?.role?.name === name;
    } else {
      return false;
    }
  };

  const hasPermission = (name: string) => {
    if (user) {
      const u = JSON.parse(user);
      const permissions = u?.value?.role?.permissions.map(
        (perm: any) => perm.name
      );

      if (permissions.includes(name)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return {
    user,
    adminLogin,
    hasRole,
    hasPermission,
    adminLogout,
  };
});

export default authStore;
