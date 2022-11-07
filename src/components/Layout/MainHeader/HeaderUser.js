import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import classes from "./HeaderUser.module.css";

const HeaderUser = () => {
  const { setAuth } = useAuth();

  const logoutHandler = () => {
    setAuth({});
  };

  return (
    <Button className={classes.iconBtn} onClick={logoutHandler}>
      <FontAwesomeIcon icon={faUser} /> Logout
    </Button>
  );
};

export default HeaderUser;
