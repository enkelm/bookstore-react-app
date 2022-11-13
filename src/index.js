import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./store/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <App
              token={localStorage.getItem("access_token")}
              role={localStorage.getItem("role")}
              userId={localStorage.getItem("user_id")}
            />
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
