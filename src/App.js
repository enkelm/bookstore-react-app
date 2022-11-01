import React, { useState } from "react";

import "./App.css";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  };

  return (
    <React.Fragment>
      <Register></Register>
    </React.Fragment>
  );
};

export default App;
