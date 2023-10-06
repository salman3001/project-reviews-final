import SucessToast from "~/components/Toast/Sueccess.vue";
import ErrorToast from "~/components/Toast/Error.vue";
import WarningToast from "~/components/Toast/Warning.vue";

export const useToastListner = () => {
  const { $toast, $listen } = useNuxtApp();

  $listen("user:deleted", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Deleted" },
    });
  });

  $listen("user:Banned", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Banned" },
    });
  });

  $listen("user:logedin", () => {
    $toast({
      component: SucessToast,
      props: { message: "Login Successfull" },
    });
  });

  $listen("user:RoleChanged", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Role Changed" },
    });
  });
};
