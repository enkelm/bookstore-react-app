import { ReactDOM } from "react";
import Card from "../Card/Card";
import classes from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalContent = (props) => {
  return <Card>{props.content}</Card>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalContent content={props.children} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
