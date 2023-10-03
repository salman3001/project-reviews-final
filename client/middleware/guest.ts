import useAuthStore from "~/store/useAuthStroe";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (authStore.user) {
    return navigateTo("/admin");
  }
});
