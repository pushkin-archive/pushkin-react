import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: process.env.NODE_ENV === "production" ? '//api.gameswithwords.org/api' : '//localhost/api',
});
export default axiosInstance;

