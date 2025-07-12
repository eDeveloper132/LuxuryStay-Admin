import { Router } from 'express';
import { getStats, rooms, users } from '../controllers/dashboardController.js';
const router = Router();
router.get('/stats', getStats);
router.get('/getusers', users);
router.get('/rooms', rooms);
export default router;
