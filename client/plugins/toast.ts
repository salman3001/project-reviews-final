import { defineNuxtPlugin } from "#app";
import Toast, { useToast, PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    position: POSITION.TOP_CENTER,
    timeout: 2000,
    closeButton: false,
    icon: false,
    bodyClassName: "toast",
  };
  nuxtApp.vueApp.use(Toast, options);
  return {
    provide: {
      toast: useToast(),
    },
  };
});
