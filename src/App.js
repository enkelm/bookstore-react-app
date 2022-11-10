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

const App = (props) => {
  const { auth, setAuth } = useAuth();

  const loginStatus = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    setAuth({
      token: props.token,
      role: props.role,
      userId: props.userId,
    });
  }, []);

  return (
    <React.Fragment>
      <ModalRoot />
      <Header />
      {loginStatus && <HomeTest />}
    </React.Fragment>
  );
};

export default App;
