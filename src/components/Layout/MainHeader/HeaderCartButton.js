import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import classes from "./HeaderCartButton.module.css";
import Button from "../../UI/Button/Button";
import useAuth from "../../../hooks/useAuth";

const HeaderCartButton = (props) => {
  const { cartCtx } = useAuth();

  const getTotalCount = () => {
    let totCount = 0;
    cartCtx.forEach((item) => (totCount += item.count));
    return totCount;
  };
  return (
    <Button className={classes.button} onClick={props.onClick}>
      <FontAwesomeIcon icon={faCartShopping} className={classes.icon} />
      <span>Your Cart</span>
      <span className={classes.badge}>{getTotalCount()}</span>
    </Button>
  );
};

export default HeaderCartButton;
