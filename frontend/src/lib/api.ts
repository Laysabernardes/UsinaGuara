import axios from 'axios';
import toast from 'react-hot-toast'; 
const api = axios.create({
  //baseURL: 'http://localhost:3000', 
  baseURL: 'https://site-v5hr.onrender.com',
});

// INTERCEPTADOR DE REQUISIÇÃO: Envia o token automaticamente
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

// INTERCEPTADOR DE RESPOSTA
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 1. DISPARA O ALERTA IMEDIATAMENTE
      toast.error("Sessão expirada! Redirecionando para o login...", {
        duration: 3000, // Tempo que o alerta fica na tela
        id: 'auth-error', // Evita que apareçam vários se houver muitas requisições
        style: {
          background: '#333',
          color: '#fff',
          border: '1px solid #ef4444'
        }
      });

      // 2. Limpa o token
      localStorage.removeItem('authToken');

      // 3. ESPERA O USUÁRIO LER E DEPOIS REDIRECIONA
      setTimeout(() => {
        window.location.href = '/login?reason=expired';
      },2500); 
    }

    return Promise.reject(error);
  }
);
export default api;