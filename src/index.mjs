import "dotenv/config";
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import baseRoutes from './routes/base.js';
import { redirectIfAuthenticated } from "./middleware/redirectifauthenticated.js";
import authRoutes from './routes/auth.js';
import dashboardstatsRoutes from './routes/dashboard.js';
import path from "path";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);
app.use('/', baseRoutes);
app.use('/api', dashboardstatsRoutes);
app.use('/api/auth', authRoutes);
app.get('/login', redirectIfAuthenticated, (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'signin.html'));
});
app.get('/signup', redirectIfAuthenticated, (req, res) => {
    res.sendFile(path.resolve('public', 'auth', 'signup.html'));
});
app.get('/logout', (req, res) => {
    res.clearCookie('user');
    return res.status(200).json({ message: 'Logged out successfully' });
});
io.on('connection', socket => {
    console.log('Client connected:', socket.id);
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});
