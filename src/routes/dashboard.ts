import { Router } from 'express';
import { getStats, users } from '../controllers/dashboardController.js';


const router = Router();
router.get('/stats', getStats);
router.get('/getusers', users);
export default router;
