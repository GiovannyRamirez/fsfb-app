import { Navigate, Outlet } from "react-router-dom";

import { URL_PAGES } from "../../constants";

import { ProfileNav } from "../ProfileNav/ProfileNav";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to={URL_PAGES.WELCOME} />;

  return (
    <>
      <ProfileNav />
      <Outlet />
    </>
  );
};
