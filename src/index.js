import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./store/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App
        token={localStorage.getItem("access_token")}
        role={localStorage.getItem("role")}
        userId={localStorage.getItem("user_id")}
      />
    </AuthProvider>
  </React.StrictMode>
);
