import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps)=> {
  const token = true; // aqui vai precisar de cookies
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
