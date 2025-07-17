// src/controllers/dashboardController.ts
import type { Request, Response } from 'express';
const core = process.env.CORE_API_URL;
export const getStats = async (req: Request, res: Response) => {

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
export const getBookings = async (req: Request, res: Response) => {
  const response = await fetch(`${core}/api/bookings`);
  const data = await response.json();
  console.log(data)
  res.json({
    totalBookings: data
  });
};

export const createBooking = async (req: Request, res: Response) => {
  const response = await fetch(`${core}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
};

export const cancelBooking = async (req: Request, res: Response) => {
  const response = await fetch(`${core}/api/bookings/${req.params.id}/cancel`, {
    method: 'PATCH',
  });
  const data = await response.json();
  res.json(data);
};

export const rooms = async (req: Request, res: Response) => {
  const response = await fetch(`${core}/api/rooms`);
  const data = await response.json();
  console.log(data)
  res.json({
    totalRooms: data
  });
};
export const updateRoom = async (req: Request, res: Response) => {
  const response = await fetch(`${core}/api/rooms/${req.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
}
export const deleteRoom = async (req: Request, res: Response) => {
  console.log(`Proxying delete request for room id: ${req.params.id}`);
  const response = await fetch(`${core}/api/rooms/${req.params.id}`, {
    method: 'DELETE',
  });
  console.log(`Received response from core service: ${response.status}`);
  const data = await response.json();
  res.json(data);
}
export const users = async (req: Request, res: Response) => {
  const response = await fetch(`${core}/usermanagement`);
  const data = await response.json();
  res.json(data);
};
