import { useEffect, useRef, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api/axios";

import Button from "../../UI/Button/Button";
import classes from "./Login.module.css";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../UI/Modal/Modal";
import { useNavigate } from "react-router-dom";
import Card from "../../UI/Card/Card";

const Login = (props) => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const emailRef = useRef("");
  const passRef = useRef("");

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

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

      let token = "undefined";
      let role = "undefined";
      let userId = "undefined";

      if (response !== undefined) {
        token = JSON.stringify(response.token).replace(/['"]+/g, "");
        role = JSON.stringify(response.role[0]).replace(/['"]+/g, "");
        userId = JSON.stringify(response.userId).replace(/['"]+/g, "");

        setAuth({ email, password, token, role, userId });
      }

      localStorage.setItem("access_token", token);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("role", role);

      // emailRef.current.value = "";
      // setEmail("");
      // passRef.current.value = "";
      // setPassword("");
    } catch (error) {
      console.log(error);
    }

    if (localStorage.getItem("access_token") !== "undefined") {
      localStorage.setItem("isLoggedIn", "LOGGED_IN");
      navigate("/home");
    }
  };

  return (
    <Card className={classes.wrapper}>
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
    </Card>
  );
};

export default Login;
