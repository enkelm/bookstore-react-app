import classes from "./ModalBody.module.css";

const ModalBody = (props) => {
  return <div className={classes[`modal-body`]}>{props.children}</div>;
};

export default ModalBody;
