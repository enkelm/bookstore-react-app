import Button from "../Button/Button";
import Card from "../Card/Card";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <Card>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div>
        <p>{props.message}</p>
      </div>
      <footer>
        <Button></Button>
      </footer>
    </Card>
  );
};

export default ErrorModal;
