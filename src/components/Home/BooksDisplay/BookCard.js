import Card from "../../UI/Card//Card";
import classes from "./BookCard.module.css";
import testImg from "../../../assets/images/test-banner.png";

const BookCard = () => {
  return (
    <Card className={classes["book-card"]}>
      <img src={testImg} />
      <div>
        <h4>Title</h4>
      </div>
    </Card>
  );
};

export default BookCard;
