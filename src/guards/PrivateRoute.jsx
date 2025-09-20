import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ allow, children }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  const ok = Array.isArray(allow) ? allow.includes(role) : role === allow;
  return ok ? children : <Navigate to="/" replace />;
}
