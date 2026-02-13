import api from "../../utils/axios/api.axios";

const processAuthToken = (authCode: string) => {
  return api.post("/sso/code", {
    code: authCode,
  });
};

export { processAuthToken };
