import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../UI/Button/Button";
import Modal from "../../../UI/Modal/Modal";
import UserCartHistory from "./UserCartHistory";
import classes from "./UserProfile.module.css";

const UserProfile = (props) => {
  const { auth, setAuth, setCartCtx } = useAuth();

  const logoutHandler = () => {
    localStorage.setItem("access_token", undefined);
    localStorage.setItem("user_id", undefined);
    localStorage.setItem("isLoggedIn", "");
    localStorage.setItem("role", undefined);
    setAuth({});
    setCartCtx([]);
    props.close();
  };

  return (
    <Modal className={classes.wrapper}>
      <FontAwesomeIcon icon={faUser} style={{ height: "5vh" }} />
      <h3>User Shopping History</h3>
      <UserCartHistory user={auth.userId} />
      <Button onClick={logoutHandler}>Logout</Button>
    </Modal>
  );
};

export default UserProfile;
