import useAuth from "../../../hooks/useAuth";
import Card from "../../UI/Card/Card";
import Modal from "../../UI/Modal/Modal";
import testImg from "../../../assets/images/test-banner.png";
import classes from "./BookInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button/Button";
import { useEffect, useRef, useState } from "react";

const BookInfo = (props) => {
  const { booksCtx, bookId, cartCtx, setCartCtx } = useAuth();

  const [counter, setCounter] = useState("0");
  const [hasValue, setHasValue] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const countRef = useRef();

  const book = booksCtx[bookId];

  useEffect(() => {
    countRef.current.focus();
    setAddedToCart(
      cartCtx.find((item) => item.itemId === book.id) !== undefined
    );
    setHasValue(counter === "0" || counter === "" || addedToCart);
  }, [counter, cartCtx]);

  const addToCartHandler = () => {
    let givenCount = parseInt(countRef.current.value);

    const getPrice = () => {
      if (givenCount <= 50) return book.price;
      else if (givenCount > 50 && givenCount <= 100) return book.price50;
      else return book.price100;
    };

    let givenPrice = getPrice();

    let totalPrice = givenPrice * givenCount;

    let cartItem = {
      itemId: book.id,
      itemTitle: book.title,
      itemAuthor: book.author,
      count: givenCount,
      price: givenPrice,
      totalPrice: totalPrice,
    };
    setCartCtx((prevState) => {
      if (prevState === undefined) prevState = [];
      return [...prevState, cartItem];
    });
    props.close();
  };

  return (
    <Modal className={(classes.wrapper, classes.card)}>
      <div className={classes[`book-info`]}>
        {book.imageUrl !== null &&
        book.imageUrl.includes("https://localhost:44384/images") ? (
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
          <tbody>
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
          </tbody>
        </table>
        <label htmlFor="count">Number of Books</label>
        <input
          id="count"
          type={"number"}
          ref={countRef}
          value={counter}
          onChange={(event) => setCounter(event.target.value)}
          className={classes.input}
          disabled={addedToCart}
          min="1"
          max="300"
        />
        <Button
          className={classes.button}
          onClick={addToCartHandler}
          disabled={hasValue}
        >
          {addedToCart ? (
            "Edit Inside Cart"
          ) : (
            <>
              Add Item(s) <FontAwesomeIcon icon={faShoppingBasket} />
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default BookInfo;
