import { defineStore } from 'pinia';
import { Notify, useQuasar } from 'quasar';
import { Socket, io } from 'socket.io-client';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const notificationStore = defineStore('notification', () => {
  const notifcations = ref<any[]>([]);
  const notificationCount = ref(0);
  const $q = useQuasar();
  const socket = ref<Socket | null>(null);

  const getUnreadNotifications = async () => {
    try {
      const res = await api.get('/notifcations/get-unread');
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

  const connectSocket = () => {
    if (!socket.value) {
      const user = $q.cookies.get('user') as any;
      const token = $q.cookies.get('socketToken') as any;

      socket.value = io(process.env.UPLOAD + '/notifications/', {
        transports: ['websocket'],
        auth: {
          userId: user?.id || '',
          socketToken: token || '',
        },
      });

      socket.value.on('room-joined', (room: string) => {
        console.log(room);
      });

      socket.value.on('new-notification', (notification: any) => {
        if (notifcations.value.length < 20) {
          notifcations.value.push(notification);
          notificationCount.value += 1;
          Notify.create({
            icon: 'info',
            color: '#FAF9F6',
            message: `New Notification! ${notification?.data?.message}`,
            timeout: 5000,
            position: 'top',
          });
        } else {
          notifcations.value.pop();
          notifcations.value.unshift(notification);
          notificationCount.value += 1;
          Notify.create({
            icon: 'info',
            color: '#FAF9F',
            message: `New Notification!  ${notification?.data?.message}`,
            timeout: 5000,
            position: 'top',
          });
        }
      });
    }
  };

  const disconnectSocket = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  return {
    notifcations,
    notificationCount,
    getUnreadNotifications,
    deleteNotifcations,
    deleteOneNotifcation,
    connectSocket,
    disconnectSocket,
  };
});

export default notificationStore;
