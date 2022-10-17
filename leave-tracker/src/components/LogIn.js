import React, { useContext } from "react";
import bgImg from "../assets/img1.jpg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import UserContext from "../context-store/userContext";

export default function LogIn(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const checkSignInAccess = (email) => {
    fetch(
      "https://leave-tracker-6fc64-default-rtdb.firebaseio.com/user/-NEbRTVJRTxbr4cp4oDv.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (let user of data) {
          if (user.email === email) {
            props.setRole(user.role);
            break;
          }
        }
      });
  };
  const onSubmit = (data) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0yER2cQq3KVCX5zcuR73cT9wXutefSek",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setIsLoggedIn(true);
        props.setEmail(data.email);
        props.setIdToken(data.idToken);
        checkSignInAccess(data.email);
      });
  };

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Log In</h2>
          <span>login and enjoy the service</span>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="email" {...register("email")} placeholder="E-mail" />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            <button className="btn">Log In</button>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="" />
          <button
            className="btn"
            style={{
              position: "absolute",
              top: "70%",
              left: "28.5%",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}
