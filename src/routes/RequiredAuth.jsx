import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "../config/axiosConfig"; // to set default header if token exists

export default function RequireAuth() {
  const location = useLocation();
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  // If token exists, ensure axios has the header (useful on page refresh)
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
