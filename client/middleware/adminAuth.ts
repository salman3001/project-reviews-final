import useAuthStore from "~/store/useAuthStroe";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  if (auth.user === undefined && auth.user?.role === undefined) {
    return navigateTo("/auth/admin-login");
  }
});
