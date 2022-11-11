import { ReactDOM } from "react";
import Card from "../Card/Card";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <Card
      className={`${classes.modal}  ${props.className}`}
      style={props.style}
    >
      {props.children}
    </Card>
  );
};

export default Modal;
