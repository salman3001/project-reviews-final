import { defineStore } from 'pinia';
import { Notify, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const authStore = defineStore('Auth', () => {
  const $q = useQuasar();
  const user = () => $q.cookies.get('user') as any;
  const router = useRouter();

  const setUser = (payload: any) => {
    $q.cookies.set('user', payload, {
      expires: 1,
    });
  };

  const setToken = (payload: any) => {
    $q.cookies.set('token', payload, {
      expires: 1,
    });
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/admin-login', {
        email,
        password,
      });
      setUser(res?.data?.user);
      setToken(res?.data?.token?.token);
      router.push({ name: 'adminDashboard' });
      Notify.create({ message: 'Login Successfull!', color: 'positive' });
    } catch (error: any) {
      Notify.create({ message: 'Login Failed!', color: 'red' });
    }

    return user;
  };

  const adminLogout = async () => {
    try {
      await api.get('/auth/admin-logout');
      $q.cookies.remove('token');
      $q.cookies.remove('user');
      Notify.create({
        message: 'Logout Successfull!',
        color: 'positive',
      });
      router.push({ name: 'adminLogin' });
    } catch (error: any) {
      Notify.create({
        message: 'Opps Something went wrong!',
        color: 'negative',
      });
    }
  };

  const hasRole = (name: string) => {
    const u = user();
    if (u) {
      return u?.role?.name === name;
    } else {
      return false;
    }
  };

  const hasPermission = (name: string) => {
    const u = user();

    if (u) {
      const permissions = u?.role?.permissions.map((perm: any) => perm.name);

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
