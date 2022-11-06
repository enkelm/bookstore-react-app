import { useRef, useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./Register.module.css";
import Modal from "../../UI/Modal/Modal";

const FNAME_REGEX = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/;
const LNAME_REGEX = /^[a-z,.'-]+$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const PHONE_REGEX = /^\+3556[0-9]{8}$/;

const Register = (props) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const phoneRef = useRef();
  const roleRef = useRef();
  const errRef = useRef();

  const [fname, setFName] = useState("");
  const [validFname, setValidFname] = useState(false);
  const [fnameFocus, setFnameFocus] = useState(false);

  const [lname, setLName] = useState("");
  const [validLname, setValidLname] = useState(false);
  const [LnameFocus, setLnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pass, setPass] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [passConfirm, setPassConfirm] = useState("");
  const [validPassConfirm, setValidPassConfirm] = useState(false);
  const [passConfirmFocus, setPassConfirmFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [role, setRole] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = FNAME_REGEX.test(fname);
    setValidFname(result);
  }, [fname]);

  useEffect(() => {
    const result = LNAME_REGEX.test(lname);
    setValidLname(result);
  }, [lname]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASS_REGEX.test(pass);
    setValidPass(result);
    const match = pass === passConfirm;
    setValidPassConfirm(match);
  }, [pass, passConfirm]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    setErrorMsg("");
  }, [fname, lname, email, pass, passConfirm, phone]);

  const submitHandler = async (event) => {
    event.preventDefault();
    let user = {
      email: email,
      password: pass,
      firstName: fname,
      lastName: lname,
      phoneNumber: phone,
      roles: [role],
    };

    createAPIEndpoint(ENDPOINTS.ACCOUNT, "register")
      .create(user)
      .then(console.log(user))
      .catch((err) => console.log(err));

    firstNameRef.current.value = "";
    setFName("");
    lastNameRef.current.value = "";
    setLName("");
    emailRef.current.value = "";
    setEmail("");
    passRef.current.value = "";
    setPass("");
    passConfirmRef.current.value = "";
    setPassConfirm("");
    phoneRef.current.value = "";
    setPhone("");
    roleRef.current.value = "default";
    setRole("");
    setSuccess(true);
    if (success) props.close();
  };

  return (
    <Modal>
      {success ? (
        <Card className={classes.wrapper}>
          <h1>Success</h1>
          <span>
            <a href="#">Sign In</a>
          </span>
        </Card>
      ) : (
        <Card className={classes.wrapper}>
          <p
            ref={errRef}
            className={errorMsg ? classes.errmsg : classes.offscreen}
            aria-live="assertive"
          >
            {errorMsg}
          </p>

          <h1>Register</h1>
          <form className={classes.form} onSubmit={submitHandler}>
            <div>
              <label htmlFor="first-name">
                First Name
                <span className={validFname ? classes.valid : classes.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validFname || !email ? classes.hide : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="text"
                id="first-name"
                ref={firstNameRef}
                autoComplete="off"
                onChange={(event) => setFName(event.target.value)}
                value={fname}
                required
                aria-invalid={validFname ? "false" : true}
                aria-describedby="firstnamenote"
                onFocus={() => setFnameFocus(true)}
                onBlur={() => setFnameFocus(false)}
              />
            </div>

            <div>
              <label htmlFor="last-name">
                Last Name
                <span className={validLname ? classes.valid : classes.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validLname || !email ? classes.hide : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="text"
                id="last-name"
                ref={lastNameRef}
                autoComplete="off"
                onChange={(event) => setLName(event.target.value)}
                value={lname}
                required
                aria-invalid={validLname ? "false" : true}
                aria-describedby="lastnamenote"
                onFocus={() => setLnameFocus(true)}
                onBlur={() => setLnameFocus(false)}
              />
            </div>

            <div>
              <label htmlFor="email">
                Email
                <span className={validEmail ? classes.valid : classes.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validEmail || !email ? classes.hide : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : true}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </div>

            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Invalid email!
            </p>

            <div>
              <label htmlFor="pass">
                Password
                <span className={validPass ? classes.valid : classes.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validPass || !pass ? classes.hide : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="pass"
                ref={passRef}
                onChange={(e) => setPass(e.target.value)}
                required
                aria-invalid={validPass ? "false" : true}
                aria-describedby="passnote"
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
              />
            </div>
            <p
              id="passnote"
              className={
                passFocus && !validPass
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Invalid password!
            </p>

            <div>
              <label htmlFor="confirm-pass">
                Confirm Password
                <span
                  className={
                    validPassConfirm && passConfirm
                      ? classes.valid
                      : classes.hide
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validPassConfirm || !passConfirm
                      ? classes.hide
                      : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="confirm-pass"
                ref={passConfirmRef}
                onChange={(e) => setPassConfirm(e.target.value)}
                required
                aria-invalid={validPassConfirm ? "false" : true}
                aria-describedby="confirm-passnote"
                onFocus={() => setPassConfirmFocus(true)}
                onBlur={() => setPassConfirmFocus(false)}
              />
            </div>

            <p
              id="confirm-passnote"
              className={
                passFocus && !validPass
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Must match the first
              password input field.
            </p>

            <div>
              <label htmlFor="phone">
                Phone Number
                <span className={validPhone ? classes.valid : classes.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validPhone || !phone ? classes.hide : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="tel"
                id="phone"
                ref={phoneRef}
                onChange={(e) => setPhone(e.target.value)}
                required
                aria-invalid={validPhone ? "false" : true}
                aria-describedby="phonenote"
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
              />
            </div>

            <div>
              <label htmlFor="role-select">Select Role</label>
              <select
                ref={roleRef}
                id="role-select"
                onChange={() => setRole(roleRef.current.value)}
                defaultValue={"default"}
              >
                <option value={"default"} disabled hidden>
                  Choose a Role
                </option>
                <option value="Administrator">Administrator</option>
                <option value="User">User</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={
                !validFname || !validLname || !validEmail || !validPassConfirm
                  ? true
                  : false
              }
            >
              Sign Up
            </Button>
          </form>
          <p>
            Already registered?
            <span>
              <a href="#">Sign In</a>
            </span>
          </p>
        </Card>
      )}
    </Modal>
  );
};

export default Register;
