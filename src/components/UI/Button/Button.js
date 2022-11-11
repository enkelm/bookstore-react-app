import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} 
      ${props.className} 
      ${props.secondaryBtn ? classes[`button--alt`] : ""}
      ${props.disabled ? classes.disabled : classes.enabled}`}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
