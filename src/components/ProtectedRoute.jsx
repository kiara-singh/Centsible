import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Corrected hook import

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useUser(); // Destructure the user from context

  // If the user exists, render the Component, otherwise redirect to /login
  return user ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
