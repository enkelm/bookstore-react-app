import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../UI/Button/Button";
import classes from "./HeaderUser.module.css";

const HeaderUser = () => {
  return (
    <Button className={classes.iconBtn}>
      <FontAwesomeIcon icon={faUser} />
    </Button>
  );
};

export default HeaderUser;
