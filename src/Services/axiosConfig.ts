// // src/api/axios.ts
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:4000/api/studies', // centralized base
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // if using cookies for auth
// });

// // Optional: Interceptors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Log error globally or show toast
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// src/Services/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/studies',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Automatically attach token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can check for 401/403 here to auto logout if needed
    if (error.response?.status === 401 || error.response?.status === 403) {
      // e.g. dispatch(logout()) or redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

