import useAuthStore from "~/store/useAuthStroe";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  if (auth.user === undefined) {
    return navigateTo("/auth/user-login");
  }
});
