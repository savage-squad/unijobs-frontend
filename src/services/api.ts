import axios from 'axios';
const baseUrlApi = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: `${baseUrlApi}`,
});

export default api;
