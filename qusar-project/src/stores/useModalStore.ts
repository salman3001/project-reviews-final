import { defineStore } from 'pinia';
import { ref } from 'vue';

type IModalContent =
  | null
  | 'deleteRecord'
  | 'changeRole'
  | 'changeAdminStatus'
  | 'delete'
  | 'contactMessage'
  | 'addContinent'
  | 'editContinent'
  | 'addCountry'
  | 'editCountry';

const useModalStore = defineStore('modal', () => {
  const show = ref(false);
  const meta = ref<any>(null);
  const content = ref<IModalContent>(null);

  const togel = (type: IModalContent, metaData?: any) => {
    meta.value = metaData;
    content.value = type;
    show.value = true;
  };

  return {
    show,
    togel,
    content,
    meta,
  };
});

export default useModalStore;
