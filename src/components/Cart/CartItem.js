import useAuth from "../../hooks/useAuth";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { booksCtx, setCartCtx } = useAuth();

  const product = {
    itemId: props.id,
    itemTitle: props.title,
    itemAuthor: props.author,
    count: props.count,
    price: props.price,
    totalPrice: props.totalPrice,
  };

  const changeCart = () => {
    setCartCtx((prevState) => {
      prevState.forEach((item) => {
        if (item.itemId === product.itemId) {
          let indexCart = prevState.indexOf(item);
          let indexBooks = booksCtx.indexOf(
            booksCtx.find((book) => book.id === product.itemId)
          );

          prevState[indexCart].count = product.count;

          if (prevState[indexCart].count <= 50) {
            prevState[indexCart].price = booksCtx[indexBooks].price;
          } else if (
            prevState[indexCart].count > 50 &&
            prevState[indexCart].count <= 100
          ) {
            prevState[indexCart].price = booksCtx[indexBooks].price50;
          } else {
            prevState[indexCart].price = booksCtx[indexBooks].price100;
          }
          prevState[indexCart].totalPrice =
            prevState[indexCart].price * prevState[indexCart].count;
        }
      });
      return [...prevState];
    });
  };

  const removeHandler = () => {
    product.count -= 1;

    if (product.count === 0) {
      setCartCtx((prevState) => {
        prevState.forEach((item) => {
          if (item.itemId === product.itemId) {
            let index = prevState.indexOf(item);
            prevState.splice(index, 1);
          }
        });
        return [...prevState];
      });
    } else {
      changeCart();
    }
  };

  const addHandler = () => {
    if (product.count === 300) {
      return;
    } else {
      product.count += 1;

      changeCart();
    }
  };

  return (
    <li className={classes[`cart-item`]}>
      <div>
        <h2>{props.title}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.price}</span>
          <span className={classes.amount}>x {props.count}</span>
        </div>
      </div>
      <div>
        <div className={classes.actions}>
          <Button onClick={removeHandler}>−</Button>
          <Button onClick={addHandler}>+</Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
