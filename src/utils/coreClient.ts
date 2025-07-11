// src/utils/apiClient.ts
import axios from 'axios';
import type { Request } from 'express';

export const createCoreClient = (req: Request) => {
  // Read the JWT from the HTTP‑only cookie
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: process.env.CORE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
