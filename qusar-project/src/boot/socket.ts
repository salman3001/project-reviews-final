import { io } from 'socket.io-client';

const socket = io(process.env.UPLOAD + '/ticket_chat/', {
  transports: ['websocket'],
  auth: {
    socketToken: '823413',
    userId: 1,
  },
});

socket.emit('join-chat', 1, (err: any, response: any) => {
  console.log(response);
});

socket.emit('chat-message', {
  message: 'My First Message',
});
