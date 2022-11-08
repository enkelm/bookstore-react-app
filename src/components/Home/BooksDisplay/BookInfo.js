import useAuth from "../../../hooks/useAuth";
import Card from "../../UI/Card/Card";
import Modal from "../../UI/Modal/Modal";
import testImg from "../../../assets/images/test-banner.png";
import classes from "./BookInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const BookInfo = () => {
  const { booksCtx, bookId } = useAuth();

  return (
    <Modal className={classes.wrapper}>
      <Card className={classes.card}>
        {!(booksCtx[bookId].imageUrl === null) ? (
          <img src={booksCtx[bookId].imageUrl} className={classes.images} />
        ) : (
          <FontAwesomeIcon icon={faImage} className={classes.images} />
        )}
      </Card>
    </Modal>
  );
};

export default BookInfo;
