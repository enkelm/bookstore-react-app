import classes from "./ModalFooter.module.css";

const ModalFooter = (props) => {
  return <div className={classes[`modal-footer`]}>{props.children}</div>;
};

export default ModalFooter;
