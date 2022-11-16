import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "animate.css";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import HomeTest from "./components/Home/HomeTest";
import PropertiesPage from "./components/Home/PropertiesPage";
import Header from "./components/Layout/MainHeader/Header";
import Layout from "./components/UI/Layout";
import ModalRoot from "./components/UI/Modal/ModalRoot";
import RequireAdmin from "./components/UI/RequireAdmin";
import RequireAuth from "./components/UI/RequireAuth";
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
      {/* {loginStatus && <HomeTest />} */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="home" element={<HomeTest />} />
          </Route>
          <Route element={<RequireAdmin />}>
            <Route path="properties" element={<PropertiesPage />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
