import { io } from 'socket.io-client';

export const socket = io(process.env.UPLOAD, {
  extraHeaders: {
    Authorization:
      'Bearer NA.CB7KM832dd04NXMkGqZ47vZVhw808beRVpZsk74iF9R7UXKzHIP5kJvmFGl3',
  },
});

socket.on('news', (arg) => {
  console.log(arg);
});
