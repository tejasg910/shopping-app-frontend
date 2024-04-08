import { getRedirectResult } from "firebase/auth";
import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PropsTypes {
  isAuthenticated?: boolean;
  children?: ReactElement;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?: string;
}
const ProtectedRoute = ({
  isAdmin,
  isAuthenticated,
  children,
  adminRoute,
  redirect = "/",
}: PropsTypes) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;
  if (adminRoute && !isAdmin) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
