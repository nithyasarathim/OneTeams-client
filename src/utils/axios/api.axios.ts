import axios from "axios";
import { TIMEOUT, APP_SERVER_URL } from "../env";

const api = axios.create({
  baseURL: APP_SERVER_URL,
  timeout: TIMEOUT,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data || error.message);
  },
);

export default api;
