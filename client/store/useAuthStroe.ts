import { defineStore } from "pinia";

const useAuthStore = defineStore("Auth", () => {
  const { $api, $event } = useNuxtApp();

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
      const res = (await $fetch($api + "/auth/admin-login", {
        method: "post",
        body: {
          email: email,
          password: password,
        },
      })) as any;

      setUser(res.user);
      setToken(res.token.token);
      navigateTo("/admin");
      $event("user:logedin");
    } catch (error: any) {
      $event("user:loginFailed");
    }
  };

  const adminLogout = async () => {
    console.log("ran");

    try {
      const res = (await $fetch($api + "/auth/admin-logout", {
        headers: { Authorization: "Bearer" + " " + token.value },
      })) as any;

      setUser(null);
      setToken(null);
      navigateTo("/auth/admin-login");
    } catch (error: any) {
      console.log(error.data);
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
    adminLogout,
  };
});

export default useAuthStore;
