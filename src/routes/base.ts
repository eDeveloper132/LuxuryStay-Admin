import { Router } from 'express';
import path from 'path';
const router = Router();

// Admin sab bookings dekh sakta hai
router.get('/', (req, res) => {
    res.send({
        message: "Admin Dashboard"
    })
});
router.get('/users', (req, res) => {
    res.sendFile(path.resolve('public', 'views', 'userManagement.html'));
});

export default router;
