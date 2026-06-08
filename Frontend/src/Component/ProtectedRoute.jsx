import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Featrus/hook/useAuth.js";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to={"/login"}></Navigate>;
};

export default ProtectedRoute;
