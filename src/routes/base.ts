import { Router } from 'express';
import path from 'path';
const router = Router();

// Admin sab bookings dekh sakta hai
router.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});
router.get('/users', (req, res) => {
    res.sendFile(path.resolve('public', 'views', 'userManagement.html'));
});
router.get('/bookings', (req, res) => {
    res.sendFile(path.resolve('public', 'views', 'bookingManagement.html'));
});

export default router;
