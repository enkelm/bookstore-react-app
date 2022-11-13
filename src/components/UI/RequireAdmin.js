import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROLES } from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const RequireAdmin = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const role = localStorage.getItem("role");

  return role === ROLES.ADMIN ? (
    <Outlet />
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
};

export default RequireAdmin;
