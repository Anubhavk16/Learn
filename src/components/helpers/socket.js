import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:8000', {
  transports: ['websocket'], 
});

socket.on('connect', () => {
  console.log('Socket connected');
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

socket.on('notification', (message) => {
  console.log('Notification:', message);
});

export default socket; 
