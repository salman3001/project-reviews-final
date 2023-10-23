import { Notify } from 'quasar';
import { api } from 'src/boot/axios';

export const rules = {
  async unique(url: string, field: string, value: string, skip?: string) {
    if (skip && skip === value) {
      return true;
    }

    try {
      const res = await api.get(url, {
        params: {
          field: field,
          value: value,
        },
      });
      if (res) {
        return true;
      }
    } catch (error: any) {
      if (error?.response) {
        // Notify.create({
        //   message: error?.response?.data?.message,
        //   color: 'negative',
        // });
      } else if (error?.request) {
        Notify.create({ message: 'Server Not Reachable!', color: 'negative' });
        console.log(error.request);
      } else {
        Notify.create({ message: error.message, color: 'negative' });
      }
      return false;
    }
  },
};
