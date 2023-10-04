import { defineStore } from "pinia";

const useAuthStore = defineStore("Auth", () => {
  const { $api, $toast } = useNuxtApp();

  const user = useCookie("user", {
    maxAge: 60 * 60 * 24 * 7,
    // encode: (val) => JSON.stringify(val),
    // decode: (val) => JSON.parse(val),
  }) as any;

  const token = useCookie("token", {
    maxAge: 60 * 60 * 24 * 7,
  });

  const setUser = (payload: any) => {
    user.value = payload;
  };

  const setToken = (payload: any) => {
    token.value = payload;
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      const res = (await $fetch($api + "/admin/login", {
        method: "post",
        body: {
          email: email,
          password: password,
        },
      })) as any;

      setUser(res.user);
      setToken(res.token.token);
    } catch (error: any) {
      $toast.show({ message: error.data.message, type: "denied", timeout: 3 });
    }
  };

  const hasRole = (name: string) => user.value?.role?.name === name;
  const hasPermission = (name: string) => {
    const permissions = user.value?.role?.permissions.map(
      (perm: any) => perm.name
    );

    if (permissions.includes(name)) {
      return true;
    } else {
      return false;
    }
  };

  return {
    user,
    adminLogin,
    hasRole,
    hasPermission,
  };
});

export default useAuthStore;
