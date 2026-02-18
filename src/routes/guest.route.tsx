import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios/api.axios";

interface GuestRouteProps {
  children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await api.get("/sso/validate");

        if (res?.success!) {
          navigate("/", { replace: true });
          return;
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [navigate]);

  if (loading) return null;

  return <>{children}</>;
};

export default GuestRoute;
