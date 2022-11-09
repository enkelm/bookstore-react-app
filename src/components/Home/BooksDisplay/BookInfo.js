import useAuth from "../../../hooks/useAuth";
import Card from "../../UI/Card/Card";
import Modal from "../../UI/Modal/Modal";
import testImg from "../../../assets/images/test-banner.png";
import classes from "./BookInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button/Button";
import { useRef } from "react";

const BookInfo = () => {
  const { booksCtx, bookId } = useAuth();

  const countRef = useRef();

  const book = booksCtx[bookId];

  return (
    <Modal className={classes.wrapper}>
      <Card className={classes.card}>
        <div className={classes[`book-info`]}>
          {book.imageUrl.includes("https://localhost:44384/images") ? (
            <img src={book.imageUrl} className={classes[`book-cover`]} />
          ) : (
            <FontAwesomeIcon icon={faImage} className={classes[`book-cover`]} />
          )}
          <div className={classes[`book-desc`]}>
            <h4>{book.title}</h4>
            <h4>{book.author}</h4>
          </div>
          <div className={`${classes[`book-desc`]}`}></div>
        </div>

        <div className={classes[`prices-container`]}>
          <h3>ISBN: {book.isbn}</h3>
          <h3>List Price: ${book.listPrice}</h3>
          <table className={classes["prices-table"]}>
            <tr style={{ borderBottom: "solid 1px #464646" }}>
              <th>Quantity</th>
              <td>1-50</td>
              <td>51-100</td>
              <td>100+</td>
            </tr>
            <tr>
              <th>Price (per book)</th>
              <td>${book.price}</td>
              <td>${book.price50}</td>
              <td>${book.price100}</td>
            </tr>
          </table>
          <label htmlFor="count">Number of Books</label>
          <input
            id="count"
            type={"number"}
            ref={countRef}
            className={classes.input}
            min="1"
            max="300"
          />
          <Button className={classes.button}>
            Add Item(s)
            <FontAwesomeIcon icon={faShoppingBasket} />
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default BookInfo;
