import useAuth from "../../hooks/useAuth";
import BookCard from "./BooksDisplay/BookCard";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../api/axios";
import BooksDisplay from "./BooksDisplay/BooksDisplay";

const HomeTest = () => {
  const { auth } = useAuth();

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
    <Card>
      <BooksDisplay />
      <Button onClick={getToken}>Token</Button>
    </Card>
  );
};

export default HomeTest;
