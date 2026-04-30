import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Key } from "lucide-react";
import api from "../utils/axios/api.axios";
import { setUser } from "../redux/user.slice";

interface UserResponse {
  userdata?: {
    data?: {
      user?: unknown;
    };
  };
}

const CallBackPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const sendAuthCode = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code");
        if (!authCode) throw new Error("No auth code found");
        await api.get("/sso/code", { params: { code: authCode } });
        const res = await api.get<unknown, UserResponse>("/sso/user");
        const userData = res?.userdata?.data?.user;

        if (!userData) {
          throw new Error("User not found");
        }

        dispatch(setUser(userData));
        navigate("/", { replace: true });
      } catch (error) {
        console.error("SSO verification failed:", error);
        navigate("/auth", { replace: true });
      }
    };

    sendAuthCode();
  }, [navigate, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-50 to-white">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-sky-200 opacity-40 animate-ping"></div>
          <Key className="relative text-sky-600 w-8 h-8" />
        </div>
        <p className="mt-8 text-lg font-semibold text-gray-700">
          Verifying your identity
        </p>
      </div>
    </div>
  );
};

export default CallBackPage;
