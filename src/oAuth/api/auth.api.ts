import api from "../../utils/axios/api.axios";
const logoutSession = () => {
  return api.get("/sso/logout");
};

export { logoutSession };
