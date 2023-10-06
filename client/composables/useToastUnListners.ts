import SucessToast from "~/components/Toast/Sueccess.vue";
import ErrorToast from "~/components/Toast/Error.vue";
import WarningToast from "~/components/Toast/Warning.vue";

export const useToastUnListner = () => {
  const { $toast, $unlisten } = useNuxtApp();

  $unlisten("user:deleted", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Deleted" },
    });
  });

  $unlisten("user:Banned", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Banned" },
    });
  });

  $unlisten("user:logedin", () => {
    $toast({
      component: SucessToast,
      props: { message: "Login Successfull" },
    });
  });

  $unlisten("user:deleted", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Delted Successfull" },
    });
  });

  $unlisten("user:RoleChanged", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Role Changed" },
    });
  });

  $unlisten("user:updated", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Updated Successfully" },
    });
  });

  $unlisten("user:created", () => {
    $toast({
      component: SucessToast,
      props: { message: "User Created Successfull" },
    });
  });
};
