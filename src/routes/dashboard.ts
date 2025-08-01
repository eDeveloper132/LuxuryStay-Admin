import { Router } from 'express';
import { cancelBooking, createBooking, deleteRoom, getBookings, getStats, rooms, updateRoom, users } from '../controllers/dashboardController.js';


const router = Router();
router.get('/stats', getStats);
router.get('/getusers', users);
router.get('/rooms', rooms);
router.get('/bookings', getBookings);
router.post('/createBooking', createBooking);
router.patch('/cancelBooking/:id', cancelBooking);
router.put('/updateRoom/:id', updateRoom);
router.delete('/deleteRoom/:id', deleteRoom);


export default router;
