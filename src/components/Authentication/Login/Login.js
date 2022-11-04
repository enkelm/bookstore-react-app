import { useContext, useRef, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api/axios";
import AuthContext from "../../../store/AuthProvider";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./Login.module.css";

const Login = (props) => {
  const { setAuth } = useContext(AuthContext);

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

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      let user = {
        email: email,
        password: password,
      };
      const token = createAPIEndpoint(ENDPOINTS.ACCOUNT, "login")
        .create(user)
        .then((res) => res.data);
      console.log(token);
      emailRef.current.value = "";
      setEmail("");
      passRef.current.value = "";
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
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
