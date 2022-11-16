import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className={`${classes.wrapper} animate__animated animate__fadeIn`}>
      {history.length !== 0 ? (
        history.map((item) => (
          <CartHistoryItem
            key={item.id}
            id={item.id}
            productId={item.productId}
            count={item.count}
          />
        ))
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <h1>No Purchase History</h1>
          <FontAwesomeIcon icon={faHistory} />
        </div>
      )}
    </div>
  );
};

export default UserCartHistory;
