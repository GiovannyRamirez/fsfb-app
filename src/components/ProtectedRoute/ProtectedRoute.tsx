import { Navigate, Outlet } from "react-router-dom";

import { URL_PAGES } from "../../constants";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to={URL_PAGES.WELCOME} />;

  return <Outlet />;
};
