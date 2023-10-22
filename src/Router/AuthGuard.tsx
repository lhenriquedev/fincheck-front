import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../app/contexts/AuthContext";

interface AuthGuardProps {
  isPrivate: boolean;
}

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    // Redirecionar para login
    return <Navigate to={"/login"} replace />;
  }

  if (signedIn && !isPrivate) {
    // Redirecionar para dashboard
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};
