import axios from "axios";

import { TIMEOUT, APP_SERVER_URL } from "../env";

const serverApi = axios.create({
  baseURL: APP_SERVER_URL,
  timeout: TIMEOUT,
  withCredentials: true,
});

export default serverApi;
