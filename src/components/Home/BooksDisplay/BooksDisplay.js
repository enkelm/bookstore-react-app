import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import BookCard from "./BookCard";
import classes from "./BooksDisplay.module.css";

const BooksDisplay = () => {
  const { booksCtx, setBooksCtx } = useAuth();
  // const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      let items = await createAPIEndpoint(ENDPOINTS.PRODUCTS, METHODS.GET_ALL)
        .fetchAll()
        .then((res) => {
          return res.data;
        });
      // setBooks(items);
      setBooksCtx(items);
    };
    getBooks();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {booksCtx.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          description={book.description}
          isbn={book.isbn}
          imgURL={book.imageUrl}
          listPrice={book.ListPrice}
          price={book.price}
          price50={book.price50}
          price100={book.price100}
        />
      ))}
    </div>
  );
};

export default BooksDisplay;
