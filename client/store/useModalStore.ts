import { defineStore } from "pinia";

type IModalContent =
  | null
  | "deleteAdminUser"
  | "changeRole"
  | "changeAdminStatus";

const useModalStore = defineStore("modal", () => {
  const show = ref(false);
  const meta = ref<any>(null);
  const content = ref<IModalContent>(null);
  const callback = ref<null | (() => void)>(() => null);

  const changeAdminStatus = (id: number, cb: () => void) => {
    content.value = "changeAdminStatus";
    meta.value = id;
    callback.value = cb;
    show.value = true;
  };

  const deleteAdminUser = (id: number, cb: () => void) => {
    content.value = "deleteAdminUser";
    meta.value = id;
    callback.value = cb;
    show.value = true;
  };

  return {
    show,
    changeAdminStatus,
    deleteAdminUser,
    content,
    callback,
    meta,
  };
});

export default useModalStore;
