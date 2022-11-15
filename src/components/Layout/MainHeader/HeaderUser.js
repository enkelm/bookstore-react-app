import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../../hooks/useAuth";
import ModalService from "../../UI/Modal/services/ModalServices";
import Button from "../../UI/Button/Button";
import classes from "./HeaderUser.module.css";
import UserProfile from "./User/UserProfile";

const HeaderUser = () => {
  const showUserProfile = () => {
    ModalService.open(UserProfile);
  };

  return (
    <Button className={classes.iconBtn} onClick={showUserProfile}>
      <FontAwesomeIcon icon={faUser} />
    </Button>
  );
};

export default HeaderUser;
