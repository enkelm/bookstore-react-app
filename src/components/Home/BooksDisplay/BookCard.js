import {
  faEdit,
  faImage,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card//Card";
import ModalService from "../../UI/Modal/services/ModalServices";
import classes from "./BookCard.module.css";
import BookInfo from "./BookInfo";

const BookCard = (props) => {
  const { booksCtx, setBookId } = useAuth();

  const showBookInfo = () => {
    setBookId(booksCtx.findIndex((book) => book.id === props.id));
    ModalService.open(BookInfo);
  };

  return (
    <Card className={classes["book-card"]}>
      {props.imgURL.includes("https://localhost:44384/images") ? (
        <img src={props.imgURL} className={classes.images} />
      ) : (
        <FontAwesomeIcon icon={faImage} className={classes.images} />
      )}
      <div className={classes[`book-desc`]}>
        <h4 className={classes.title}>{props.title}</h4>
        <h5 className={classes.author}>{props.author}</h5>
        <p className={classes.description}>{props.description}</p>
      </div>
      <div className={classes[`button-wrapper`]}>
        <Button onClick={showBookInfo}>
          Purchase
          <FontAwesomeIcon icon={faPlusCircle} style={{ marginLeft: "1rem" }} />
        </Button>
        <Button>
          Edit <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "1rem" }} />
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;
