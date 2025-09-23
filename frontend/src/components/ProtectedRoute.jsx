// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // ✅ Check if token exists in localStorage
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Not logged in → redirect to login page
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedRoute;
