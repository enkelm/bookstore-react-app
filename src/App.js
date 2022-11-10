import React, { useEffect, useState } from "react";

import "./App.css";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import HomeTest from "./components/Home/HomeTest";
import Header from "./components/Layout/MainHeader/Header";
import Button from "./components/UI/Button/Button";
import ModalRoot from "./components/UI/Modal/ModalRoot";
import ModalService from "./components/UI/Modal/services/ModalServices";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { auth, setAuth } = useAuth();

  const loginStatus = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (loginStatus !== "") {
      localStorage.setItem("access_token", auth.token);
      localStorage.setItem("user_id", auth.userId);
      localStorage.setItem("role", auth.role);
    } else {
      let token = localStorage.getItem("access_token");
      let role = localStorage.getItem("role");
      let userId = localStorage.getItem("user_id");
      setAuth({
        token,
        role,
        userId,
      });
    }
  }, [loginStatus]);

  return (
    <React.Fragment>
      <ModalRoot />
      <Header />
      {loginStatus && <HomeTest />}
    </React.Fragment>
  );
};

export default App;
