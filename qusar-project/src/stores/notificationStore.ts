import { defineStore } from 'pinia';
import { Notify, useQuasar } from 'quasar';
import { Socket, io } from 'socket.io-client';
import { ref } from 'vue';
import { notifcationApi } from 'src/utils/BaseApiService';

const notificationStore = defineStore('notification', () => {
  const notifcations = ref<any[]>([]);
  const notificationCount = ref(0);
  const $q = useQuasar();
  const socket = ref<Socket | null>(null);

  const getMenuNotifications = async () => {
    notifcationApi.getMenuNotifications().then(({ data }) => {
      notifcations.value = (data.value as any)?.notifcations;
      notificationCount.value = (data.value as any)?.count;
    });
  };

  const deleteNotifcations = async (type: 'all' | 'read') => {
    if (type == 'all') {
      const { execute } = notifcationApi.deleteAllNotifcations(
        {},
        {
          onSuccess: () => {
            notifcations.value = [];
            notificationCount.value = 0;
          },
        }
      );
      execute();
    } else if (type == 'read') {
      await notifcationApi
        .deleteReadNotifcations(
          {},
          {
            onSuccess: () => {
              getMenuNotifications();
            },
          }
        )
        .execute();
    }
  };

  const deleteOneNotifcation = async (id: string) => {
    const { execute } = notifcationApi.delete(
      {},
      {
        onSuccess: () => {
          getMenuNotifications();
        },
      }
    );
    execute(id);
  };

  const markAsRead = async (id: string) => {
    const { execute } = notifcationApi.markAsRead(
      {},
      {
        onSuccess: () => {
          getMenuNotifications();
        },
      }
    );
    execute(id);
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
    getMenuNotifications,
    deleteNotifcations,
    deleteOneNotifcation,
    connectSocket,
    disconnectSocket,
    markAsRead,
  };
});

export default notificationStore;
