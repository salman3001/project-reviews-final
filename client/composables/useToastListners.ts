import SucessToast from "~/components/Toast/Sueccess.vue";
import ErrorToast from "~/components/Toast/Error.vue";
import WarningToast from "~/components/Toast/Warning.vue";

export const useToastListner = () => {
  const { $toast, $listen } = useNuxtApp();

  $listen("record:created", (payload) => {
    $toast({
      component: SucessToast,
      props: { message: payload?.message || "Record Cretaed Successfully" },
    });
  });

  $listen("record:updated", (payload) => {
    $toast({
      component: SucessToast,
      props: { message: payload?.message || "Record Updated Successfully" },
    });
  });

  $listen("record:deleted", (payload) => {
    $toast({
      component: SucessToast,
      props: { message: payload?.message || "Record Deleted Successfully" },
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

  $listen("Fetch:error", (data) => {
    $toast({
      component: ErrorToast,
      props: { message: data?.message },
    });
  });
};
