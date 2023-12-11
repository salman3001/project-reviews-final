import { defineStore } from 'pinia';
import { Notify, useQuasar } from 'quasar';
import { io } from 'socket.io-client';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const notificationStore = defineStore('notification', () => {
  const notifcations = ref<any[]>([]);
  const notificationCount = ref({
    total: 0,
    unread: 0,
  });
  const $q = useQuasar();

  const getAllNotification = async () => {
    try {
      const res = await api.get('/notifcations');
      notifcations.value = res?.data?.notifcations;
      notificationCount.value = res?.data?.count;
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

  const getSocket = () => {
    const user = $q.cookies.get('user') as any;
    const token = $q.cookies.get('socketToken') as any;
    console.log(process.env.UPLOADS + '/notification');

    const socket = io(process.env.UPLOAD + '/user-socket/', {
      transports: ['websocket'],
      auth: {
        userId: user?.id || '',
        socketToken: token || '',
      },
    });

    socket.on('room-joined', (room: string) => {
      console.log(room);
    });

    socket.on('new-notification', (data: any) => {
      notifcations.value.push({ data });
      notificationCount.value.unread += 1;
    });
  };

  return {
    notifcations,
    notificationCount,
    getAllNotification,
    deleteNotifcations,
    deleteOneNotifcation,
    getSocket,
  };
});

export default notificationStore;
