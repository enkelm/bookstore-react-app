import { useEffect, useRef, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api/axios";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./Login.module.css";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../UI/Modal/Modal";

const Login = (props) => {
  const { auth, setAuth } = useAuth();

  const emailRef = useRef("");
  const passRef = useRef("");

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && password.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);

    setFormIsValid(event.target.value.trim().length > 6 && email.includes("@"));
  };

  const validateEmailHandler = () => {
    setEmailIsValid(email.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length > 6);
  };

  localStorage.setItem("isLoggedIn", "");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      let user = {
        email: email,
        password: password,
      };
      let response = await createAPIEndpoint(ENDPOINTS.ACCOUNT, "login")
        .create(user)
        .then((res) => res.data)
        .catch((error) => console.log(error));

      let token = JSON.stringify(response.token).replace(/['"]+/g, "");
      let role = JSON.stringify(response.role[0]).replace(/['"]+/g, "");
      let userId = JSON.stringify(response.userId).replace(/['"]+/g, "");

      setAuth({ email, password, token, role, userId });

      localStorage.setItem("access_token", token);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("role", role);
      emailRef.current.value = "";

      setEmail("");
      passRef.current.value = "";
      setPassword("");
    } catch (error) {
      console.log(error);
    }
    if (auth !== {}) {
      localStorage.setItem("isLoggedIn", "LOGGED_IN");
      props.close();
    }
  };

  return (
    <Modal>
      <form className={classes.login} onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">
            <span>E-Mail</span>
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            value={email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">
            <span>Password</span>
          </label>
          <input
            type="password"
            id="password"
            ref={passRef}
            value={password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
