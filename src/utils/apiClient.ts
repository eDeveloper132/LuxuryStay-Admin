// src/utils/apiClient.ts
import axios from 'axios';
const coreAPI = axios.create({
  baseURL: process.env.CORE_API_URL,
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});
export default coreAPI;
