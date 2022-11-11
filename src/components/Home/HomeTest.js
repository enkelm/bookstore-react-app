import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../api/axios";
import BooksDisplay from "./BooksDisplay/BooksDisplay";
import classes from "./HomeTest.module.css";

const HomeTest = () => {
  const getToken = async () => {
    await createAPIEndpoint(ENDPOINTS.CATEGORIES, METHODS.PUT)
      .update(1, {
        name: "test",
        displayOrder: 4,
        createdDateTime: "2022-11-05T18:24:11.112Z",
      })
      .then((res) => JSON.stringify(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className={classes.wrapper}>
      <BooksDisplay />
      <Button onClick={getToken}>Token</Button>
    </div>
  );
};

export default HomeTest;
