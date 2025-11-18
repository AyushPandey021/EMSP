import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // 🔹 Show loading state
  if (loading) return <div>Loading...</div>;

  // 🔹 If user not logged in
  if (!user) return <Navigate to="/login" />;

  // 🔹 If user role does not match
  if (user.role !== requiredRole) return <Navigate to="/admin-dashboard" />;

  // ✅ Otherwise, render the child component
  return children;
};

export default RoleBasedRoute;
