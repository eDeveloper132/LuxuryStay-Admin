const core = process.env.CORE_API_URL;
export const getStats = async (req, res) => {
    // Call each core endpoint and extract .data
    const rooms = await fetch(`${core}/api/rooms`);
    const occupied = await fetch(`${core}/api/rooms/occupiedrooms`);
    const todaysBookings = await fetch(`${core}/api/bookings/todaysbookings`);
    const revenue = await fetch(`${core}/api/invoices/sumofrevenue`);
    const roomsData = await rooms.json();
    const occupiedData = await occupied.json();
    const todaysBookingsData = await todaysBookings.json();
    const revenueData = await revenue.json();
    // Return clear numeric fields
    res.json({
        totalRooms: roomsData,
        occupiedRooms: occupiedData,
        todaysBookings: todaysBookingsData,
        revenue: revenueData
    });
};
export const rooms = async (req, res) => {
    const response = await fetch(`${core}/api/rooms`);
    const data = await response.json();
    console.log(data);
    res.json({
        totalRooms: data
    });
};
export const users = async (req, res) => {
    const response = await fetch(`${core}/usermanagement`);
    const data = await response.json();
    res.json(data);
};
