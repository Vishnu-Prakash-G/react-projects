import "./App.css";
import SignIn from "./components/SignIn";
import { useState } from "react";
import LogIn from "./components/LogIn";
import HomePage from "./components/HomePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserContext from "./context-store/userContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState();
  const [idToken, setIdToken] = useState();
  const [role, setRole] = useState();
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        email: email,
        idToken: idToken,
        role: role,
      }}
    >
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <LogIn
                setIsLoggedIn={setIsLoggedIn}
                setEmail={setEmail}
                setIdToken={setIdToken}
                setRole={setRole}
              />
            }
          />
          {/* <Route
            path="/signin"
            element={
              hasAccessToCreateUser ? (
                <SignIn />
              ) : (
                navigate("/login", { replace: true })
              )
            }
          /> */}
          <Route
            exact
            path="/signin"
            element={
              <PrivateRoute>
                <SignIn />
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
