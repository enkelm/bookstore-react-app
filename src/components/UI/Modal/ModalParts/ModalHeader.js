import classes from "./ModalHeader.module.css";

const ModalHeader = (props) => {
  return <div className={classes[`modal-header`]}>{props.children}</div>;
};

export default ModalHeader;
