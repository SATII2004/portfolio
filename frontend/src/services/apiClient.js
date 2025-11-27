import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

const cached = localStorage.getItem('portfolio_auth');
if (cached) {
  const parsed = JSON.parse(cached);
  if (parsed?.token) {
    api.defaults.headers.common.Authorization = `Bearer ${parsed.token}`;
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem('portfolio_auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;

