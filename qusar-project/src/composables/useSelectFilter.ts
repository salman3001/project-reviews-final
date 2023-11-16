import { ref } from 'vue';
import { BaseApiService } from 'src/utils/BaseApiService';
import { AdditionalParams } from 'src/type';

export const useSelectFilter = (
  api: BaseApiService,
  filters: AdditionalParams,
  beforeFetch?: () => void
) => {
  const model = ref<null | Record<string, any>>(null);
  const options = ref([]);
  const filterFunction = () => {
    beforeFetch && beforeFetch();
    api.index({ ...filters }).then(({ data }) => {
      options.value = (data.value as any)?.map((v: any) => ({
        label: v?.name,
        value: v?.id,
      }));
    });
  };

  return [model, options, filterFunction];
};
