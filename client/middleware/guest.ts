import useAuthStore from "~/store/useAuthStroe";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  if (auth.user && auth.user?.role) {
    return navigateTo("/admin");
  }

  if (auth.user && auth.user?.role === undefined) {
    return navigateTo("/");
  }
});
