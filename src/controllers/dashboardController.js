import coreAPI from '../utils/apiClient.js';
export const getStats = async (_req, res) => {
    const totalRooms = await coreAPI.get('/api/rooms');
    const occupied = await coreAPI.get('/api/rooms/occupiedrooms');
    const todaysBookings = await coreAPI.get('/api/bookings/todaysbookings');
    const revenue = await coreAPI.get('/api/invoices/sumofrevenue');
    res.json({ totalRooms, occupied, todaysBookings, revenue: revenue.data });
};
