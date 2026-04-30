import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../utils/axios/api.axios";
import { setUser, clearUser } from "../redux/user.slice";
import { logoutSession } from "../oAuth/api/auth.api";

interface AuthorizedRouteProps {
  children: ReactNode;
}

interface ValidateResponse {
  success: boolean;
}

interface UserResponse {
  userdata?: {
    data?: {
      user?: unknown;
    };
  };
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const validateData =
          await api.get<unknown, ValidateResponse>("/sso/validate");

        if (!validateData?.success) {
          throw new Error("Invalid session");
        }

        const userDataResponse =
          await api.get<unknown, UserResponse>("/sso/user");
        const user = userDataResponse?.userdata?.data?.user;

        if (!user) {
          throw new Error("User not found");
        }

        dispatch(setUser(user));
      } catch (error) {
        await logoutSession();
        dispatch(clearUser());
        navigate("/auth", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading session...</div>;
  }

  return <>{children}</>;
};

export default AuthorizedRoute;
