import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import classes from "./HeaderCartButton.module.css";
import Button from "../../UI/Button/Button";

const HeaderCartButton = (props) => {
  return (
    <Button className={classes.button}>
      <FontAwesomeIcon icon={faCartShopping} className={classes.icon} />
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </Button>
  );
};

export default HeaderCartButton;
