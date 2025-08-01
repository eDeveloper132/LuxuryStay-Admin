import { Request, Response, Router } from 'express';
import path from 'path';
const router = Router();

// Admin sab bookings dekh sakta hai
router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve('public', 'index.html'));
});
router.get('/users', (req: Request, res: Response) => {
    res.sendFile(path.resolve('public', 'views', 'userManagement.html'));
});
router.get('/bookings', (req: Request, res: Response) => {
    res.sendFile(path.resolve('public', 'views', 'bookings.html'));
});

export default router;
