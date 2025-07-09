import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';
import { getStats } from '../controllers/dashboardController.js';


const router = Router();
router.get('/', protect, authorize(['admin']), getStats);
export default router;
