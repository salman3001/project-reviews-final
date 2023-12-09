import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const notificationStore = defineStore('notification', () => {
  const notifcations = ref([]);
  const notificationCount = ref<null | Record<string, number>>(null);

  const getAllNotification = async () => {
    try {
      const res = await api.get('/notifcations');
      notifcations.value = res?.data?.notifcations;
      notificationCount.value = res?.data?.notifcations;
      // Notify.create({ message: 'Login Successfull!', color: 'positive' });
    } catch (error: any) {
      Notify.create({ message: 'Failed to fetch notifcations', color: 'red' });
    }
  };

  const deleteNotifcations = async (type: 'all' | 'read') => {
    try {
      await api.delete('/notifcations/delete/' + type);
      Notify.create({
        message: 'notifcations Deleted Successfull!',
        color: 'positive',
      });
    } catch (error: any) {
      Notify.create({
        message: 'Failed to delete notifcations! Something went wrong',
        color: 'negative',
      });
    }
  };

  const deleteOneNotifcation = async (id: string) => {
    try {
      await api.delete('/notifcations/delete/' + id);
      Notify.create({
        message: 'notifcation Deleted Successfull!',
        color: 'positive',
      });
    } catch (error: any) {
      Notify.create({
        message: 'Failed to delete notifcation! Something went wrong',
        color: 'negative',
      });
    }
  };

  return {
    notifcations,
    notificationCount,
    getAllNotification,
    deleteNotifcations,
    deleteOneNotifcation,
  };
});

export default notificationStore;
