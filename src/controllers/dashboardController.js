export const getStats = async (req, res) => {
    // Call each core endpoint and extract .data
    const { data: rooms } = await axios.get('/api/rooms/count');
    const { data: occupied } = await axios.get('/api/rooms/occupied');
    const { data: todaysBookings } = await axios.get('/api/bookings/today');
    const { data: revenue } = await axios.get('/api/invoices/sumofrevenue');
    // Return clear numeric fields
    res.json({
        totalRooms: rooms.total,
        occupied: occupied.occupied,
        todaysBookings: todaysBookings.count,
        revenue: revenue.sum,
    });
};
export const users = async (req, res) => {
    const { data } = await axios.get('/api/usermanagement');
    res.json(data);
};
