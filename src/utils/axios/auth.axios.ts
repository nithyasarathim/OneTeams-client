import axios from "axios";

import { TIMEOUT, AUTH_SERVER_URL } from "../env";

const authApi = axios.create({
  baseURL: AUTH_SERVER_URL,
  timeout: TIMEOUT,
  withCredentials: true,
});

export default authApi;
