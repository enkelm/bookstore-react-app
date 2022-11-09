import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import classes from "./HeaderCartButton.module.css";
import Button from "../../UI/Button/Button";
import useAuth from "../../../hooks/useAuth";

const HeaderCartButton = (props) => {
  const { cartCxt } = useAuth();
  return (
    <Button className={classes.button} onClick={props.onClick}>
      <FontAwesomeIcon icon={faCartShopping} className={classes.icon} />
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCxt.count}</span>
    </Button>
  );
};

export default HeaderCartButton;
