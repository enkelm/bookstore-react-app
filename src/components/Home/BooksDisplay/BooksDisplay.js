import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import BookCard from "./BookCard";
import classes from "./BooksDisplay.module.css";

const BooksDisplay = () => {
  const { booksCtx, setBooksCtx } = useAuth();
  // const [books, setBooks] = useState([]);

  const numColumns = () => {
    if (booksCtx.length === 1) return "1fr";
    if (booksCtx.length === 2) return "1fr 1fr";
    if (booksCtx.length >= 3) return "1fr 1fr 1fr";
  };

  const numRows = () => {
    if (booksCtx.length <= 3) return "1fr";
    else {
      let string = "";
      let rows = booksCtx.length / 3;
      rows = Math.round(rows);
      for (let i = 0; i < rows; i++) {
        string += "1fr ";
      }
      return string;
    }
  };

  const columns = numColumns();
  const rows = numRows();

  return (
    <div
      className={classes.wrapper}
      style={{
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
      }}
    >
      {booksCtx.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          description={book.description}
          isbn={book.isbn}
          imgURL={`${book.imageUrl}?${Math.floor(Math.random() * 100)}`}
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
