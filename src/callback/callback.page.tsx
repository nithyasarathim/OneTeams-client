import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Key } from "lucide-react";
import api from "../utils/axios/api.axios";

const CallBackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sendAuthCode = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code");
        if (!authCode) {
          throw new Error("No auth code found");
        }
        await api.get("/sso/code", {
          params: { code: authCode },
        });
        const res = await api.get("/sso/user");
        const user = res?.userdata?.data?.user;
        await localStorage.setItem("userdata", JSON.stringify(user));
        navigate("/");
        console.log(user);
      } catch (error) {
        console.error("SSO verification failed:", error);
      }
    };

    sendAuthCode();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-50 to-white">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-sky-200 opacity-40 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-sky-100"></div>
          <Key className="relative text-sky-600 w-8 h-8 animate-bounce-slow" />
        </div>

        <p className="mt-8 text-lg font-semibold text-gray-700">
          Verifying your identity
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Please wait while we securely confirm your details.
        </p>
      </div>
    </div>
  );
};

export default CallBackPage;
