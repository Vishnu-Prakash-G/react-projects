import React from "react";

const UserContext = React.createContext({
  isLoggedIn: false,
  email: "",
  idToken: "",
  role: "",
});

export default UserContext;
