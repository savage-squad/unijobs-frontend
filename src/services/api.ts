import axios from 'axios';

const baseUrlApi = process.env.REACT_APP_BASE_URL || 'localhost:8080';

const api = axios.create({
  baseURL: `http://${baseUrlApi}`,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const token = localStorage.getItem('@UniJobs:token');
    if (error.response.status === 401 && token) {
      localStorage.removeItem('@UniJobs:token');
      console.debug('Token inválido ou expirado');
    }
  },
);

export default api;
