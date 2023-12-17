import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { Socket, io } from 'socket.io-client';
import { ref } from 'vue';
import { SupportTickeApi } from 'src/utils/BaseApiService';

const chatMessageStore = defineStore('chatMessageStore', () => {
  const messages = ref<Record<string, any> | null>(null);
  const $q = useQuasar();
  const socket = ref<Socket | null>(null);
  const loadingMore = ref(false);

  const getMessages = async (ticketId: string) => {
    SupportTickeApi.getMessages(ticketId).then(({ data }) => {
      messages.value = (data.value as any).messages;
    });
  };

  const getMoreMessages = async (ticketId: string, page: number) => {
    loadingMore.value = true;
    SupportTickeApi.getMessages(ticketId, {}, page, 20)
      .then(({ data }) => {
        const newMessages = [
          ...messages.value?.data,
          ...(data.value as any).messages.data,
        ];
        messages.value.data = newMessages;
        loadingMore.value = false;
      })
      .catch(() => {
        loadingMore.value = false;
      });
  };

  const playSound = () => {
    const audio = new Audio('/audio/water_droplet.mp3');
    audio.play();
  };

  const connectSocket = (ticketId: string) => {
    if (!socket.value) {
      const user = $q.cookies.get('user') as any;
      const token = $q.cookies.get('socketToken') as any;

      socket.value = io(process.env.UPLOAD + '/ticket_chat/', {
        transports: ['websocket'],
        auth: {
          userId: user?.id || '',
          socketToken: token || '',
        },
      });

      socket.value.emit('join-chat', ticketId);

      socket.value.on('room-joined', (room: string) => {
        console.log(room);
      });

      socket.value.on('new-message', (message: any) => {
        messages.value?.data.unshift(message);
        playSound();
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
    connectSocket,
    disconnectSocket,
    getMessages,
    messages,
    getMoreMessages,
    loadingMore,
  };
});

export default chatMessageStore;
