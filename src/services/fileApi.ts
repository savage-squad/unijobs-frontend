import axios from 'axios';

const fileApi = axios.create({
  baseURL: `https://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5`,
});

export default fileApi;
