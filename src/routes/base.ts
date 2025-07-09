import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';
const router = Router();

// Admin sab bookings dekh sakta hai
router.get('/', protect, authorize(['admin']), (req, res) => {
    res.sendFile('../views/dashboard.html');
});

export default router;
