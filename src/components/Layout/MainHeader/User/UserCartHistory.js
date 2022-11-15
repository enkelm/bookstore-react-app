import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../../api/axios";
import Card from "../../../UI/Card/Card";
import CartHistoryItem from "./CartHistoryItem";
import classes from "./UserCartHistory.module.css";

const UserCartHistory = (props) => {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    let items = await createAPIEndpoint(ENDPOINTS.SHOPPING_CART, "GetByUser")
      .fetchById(props.user)
      .then((res) => res.data);
    setHistory(items);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className={classes.wrapper}>
      {history.map((item) => (
        <CartHistoryItem
          key={item.id}
          id={item.id}
          productId={item.productId}
          count={item.count}
        />
      ))}
    </div>
  );
};

export default UserCartHistory;
