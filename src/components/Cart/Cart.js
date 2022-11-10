import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { cartCtx, setCartCtx } = useAuth();

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const getCartTotal = () => {
      let total = 0;
      cartCtx.forEach((item) => (total += item.totalPrice));
      return total;
    };

    setCartTotal(getCartTotal());
  }, [cartCtx]);

  const makeOrderHandler = async () => {};

  return (
    <Modal>
      <ul className={classes[`cart-items`]}>
        {cartCtx.map((prod) => (
          <CartItem
            key={prod.itemId}
            id={prod.itemId}
            title={prod.itemTitle}
            author={prod.itemAuthor}
            count={prod.count}
            price={prod.price}
            totalPrice={prod.totalPrice}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotal}</span>
      </div>
      <div className={classes.actions}>
        {cartCtx.length !== 0 && (
          <Button onClick={makeOrderHandler}>Order</Button>
        )}
        <Button secondaryBtn={true} onClick={props.close}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default Cart;
