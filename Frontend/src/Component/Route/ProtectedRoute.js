import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenicated");

  const navigate = useNavigate();

  if (isAuthenticated === "false") return <Navigate to={"/Login"} />;

  return <Outlet />;
};
export default memo(ProtectedRoute);
