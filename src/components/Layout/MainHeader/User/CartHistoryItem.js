import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../UI/Button/Button";
import Card from "../../../UI/Card/Card";
import classes from "./CartHistoryItem.module.css";

const CartHistoryItem = (props) => {
  const { booksCtx } = useAuth();
  const [bookId, setBookId] = useState(0);

  useEffect(() => {
    setBookId(booksCtx.findIndex((book) => book.id === props.productId));
  }, []);

  const deleteHandler = async () => {
    await createAPIEndpoint(ENDPOINTS.SHOPPING_CART, METHODS.DELETE)
      .delete(props.id)
      .catch((error) => console.log(error));
  };

  const book = booksCtx[bookId];
  return (
    <Card className={classes.wrapper}>
      <h2>{book.title}</h2>
      <span className={classes.badge}>{props.count}</span>
      <Button
        secondaryBtn={true}
        onClick={deleteHandler}
        style={{ padding: "0.5rem 1rem" }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Card>
  );
};

export default CartHistoryItem;
