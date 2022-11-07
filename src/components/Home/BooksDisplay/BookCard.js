import Card from "../../UI/Card//Card";
import classes from "./BookCard.module.css";
import testImg from "../../../assets/images/test-banner.png";

const BookCard = (props) => {
  // {`file:///${props.imgURL}`}
  console.log(props.imgURL);
  return (
    <Card className={classes["book-card"]}>
      <img src={testImg} />
      <div>
        <h4>{props.title}</h4>
      </div>
    </Card>
  );
};

export default BookCard;
