// Services/axiosConfig.ts
import axios from 'axios';
import type { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction | null = null;
export const setNavigate = (navFn: NavigateFunction) => {
  navigate = navFn;
};

// NEW: onUnauthorized callback
let onUnauthorized: (() => void) | null = null;
export const setOnUnauthorized = (cb: () => void) => {
  onUnauthorized = cb;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/studies',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401/403 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (onUnauthorized) onUnauthorized(); // trigger logout callback
      if (navigate) navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
