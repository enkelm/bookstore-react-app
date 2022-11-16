import {
  faEdit,
  faImage,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLES } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import CreateBook from "../../Forms/CreateBook/CreateBook";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card//Card";
import ModalService from "../../UI/Modal/services/ModalServices";
import classes from "./BookCard.module.css";
import BookInfo from "./BookInfo";

const BookCard = (props) => {
  const { auth, booksCtx, setBookId, setEdit } = useAuth();

  const showBookInfo = () => {
    setBookId(booksCtx.findIndex((book) => book.id === props.id));
    ModalService.open(BookInfo);
  };

  const showEditBook = () => {
    setBookId(booksCtx.findIndex((book) => book.id === props.id));
    setEdit(true);
    ModalService.open(CreateBook);
  };

  return (
    <Card
      className={`${classes["book-card"]} animate__animated animate__bounceIn `}
    >
      {props.imgURL !== null &&
      props.imgURL.includes("https://localhost:44384/images") ? (
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
        {auth.role === ROLES.ADMIN && (
          <Button onClick={showEditBook}>
            Edit{" "}
            <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "1rem" }} />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default BookCard;
