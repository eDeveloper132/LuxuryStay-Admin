import "dotenv/config";
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import baseRoutes from './routes/base.js';
import authRoutes from './routes/auth.js';
const app = express();
app.use(express.json());
app.use(express.static('public'));
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);
app.use('/', baseRoutes);
app.use('/api/auth', authRoutes);
io.on('connection', socket => {
    console.log('Client connected:', socket.id);
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});
