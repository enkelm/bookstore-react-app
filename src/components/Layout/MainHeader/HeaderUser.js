import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import classes from "./HeaderUser.module.css";

const HeaderUser = () => {
  const { setAuth } = useAuth();

  const logoutHandler = () => {
    localStorage.setItem("access_token", undefined);
    localStorage.setItem("isLoggedIn", "");
    localStorage.setItem("role", undefined);
    setAuth({});
  };

  return (
    <Button className={classes.iconBtn} onClick={logoutHandler}>
      <FontAwesomeIcon icon={faUser} style={{ marginRight: "1rem" }} /> Logout
    </Button>
  );
};

export default HeaderUser;
