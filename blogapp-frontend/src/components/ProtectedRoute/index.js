import Cookies from "js-cookie";

import React from "react";
import { Redirect, Route } from "react-router-dom";

// ProtectedRoute component to protect certain routes from unauthenticated users
const ProtectedRoute = (props) => {
  //Get the jwtToken from the cookies
  const jwtToken = Cookies.get("jwt_token");

  // If the token exists, render the requested route or redirect the user to the login page
  if (jwtToken) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
