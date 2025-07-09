import io from 'socket.io-client';
const socket = io('http://localhost:3001');
socket.on('booking:created', (data:any) => { /* UI badge increment */ });
socket.on('invoice:generated', (data:any) => { /* alert */ });
