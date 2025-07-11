// src/utils/apiClient.ts
import axios from 'axios';
export const createCoreClient = (req) => {
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
