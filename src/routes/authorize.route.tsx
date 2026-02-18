import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios/api.axios";

interface AuthorizedRouteProps {
  children: ReactNode;
}

const AuthorizedRoute = ({ children }: AuthorizedRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await api.get("/sso/validate");

        if (!res?.success) {
          navigate("/auth", { replace: true });
          return;
        }
      } catch {
        navigate("/auth", { replace: true });
        return;
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [navigate]);

  if (loading) return null;

  return <>{children}</>;
};

export default AuthorizedRoute;
