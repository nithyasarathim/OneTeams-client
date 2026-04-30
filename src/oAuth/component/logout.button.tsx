import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSession } from "../api/auth.api";
import { clearUser } from "../../redux/user.slice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutSession();
      dispatch(clearUser());
      navigate("/auth", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition-colors duration-200 shadow-sm"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
