import { ReactDOM } from "react";
import Card from "../Card/Card";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={`${classes.modal} ${classes[`d-block`]}`}>
      <div className={classes[`modal-dialog`]}>
        <div className={classes[`modal-content`]}>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
