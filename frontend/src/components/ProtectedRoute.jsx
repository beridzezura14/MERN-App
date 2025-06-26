import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  if (typeof window === "undefined") return null;

  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/access" />;
}

export default ProtectedRoute;
