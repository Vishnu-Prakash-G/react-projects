import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./context-store/userContext";

export default function PrivateRoute({ children }) {
  const userCtx = useContext(UserContext);
  console.log(userCtx);

  if (userCtx.role === "admin" || userCtx.role === "manager") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
