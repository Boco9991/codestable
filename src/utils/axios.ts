import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://77.78.198.63:252/',
});

export default axiosInstance;
