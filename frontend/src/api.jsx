import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  console.log(config)
  return config;
});

export default api;