import io from 'socket.io-client';
const socket = io('http://localhost:3001');
socket.on('booking:created', (data) => { });
socket.on('invoice:generated', (data) => { });
