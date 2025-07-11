// src/controllers/dashboardController.ts
import type { Request, Response } from 'express';

export const getStats = async (req: Request, res: Response) => {

  // Call each core endpoint and extract .data
  const { data: rooms } = await axios.get<{ total: number }>('/api/rooms/count');
  const { data: occupied } = await axios.get<{ occupied: number }>('/api/rooms/occupied');
  const { data: todaysBookings } = await axios.get<{ count: number }>('/api/bookings/today');
  const { data: revenue } = await axios.get<{ sum: number }>('/api/invoices/sumofrevenue');

  // Return clear numeric fields
  res.json({
    totalRooms: rooms.total,
    occupied: occupied.occupied,
    todaysBookings: todaysBookings.count,
    revenue: revenue.sum,
  });
};

export const users = async (req: Request, res: Response) => {
  const { data } = await axios.get('/api/usermanagement');
  res.json(data);
};
