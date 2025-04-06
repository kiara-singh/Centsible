import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;