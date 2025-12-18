import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  //baseURL: 'https://site-v5hr.onrender.com',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;