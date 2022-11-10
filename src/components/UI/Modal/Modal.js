import { ReactDOM } from "react";
import Card from "../Card/Card";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <Card
      className={`${classes.modal} ${classes[`modal-content`]} ${
        props.className
      }`}
    >
      {props.children}
    </Card>
  );
};

export default Modal;
