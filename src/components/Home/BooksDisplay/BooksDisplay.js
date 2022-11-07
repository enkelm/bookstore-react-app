import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../api/axios";
import Button from "../../UI/Button/Button";
import BookCard from "./BookCard";
import classes from "./BooksDisplay.module.css";

const BooksDisplay = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      let items = await createAPIEndpoint(ENDPOINTS.PRODUCTS, METHODS.GET_ALL)
        .fetchAll()
        .then((res) => {
          return res.data;
        });
      console.log(items);
      setBooks(items);
    };
    getBooks();
  }, []);

  return (
    <>
      {books.map((book) => (
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
    </>
  );
};

export default BooksDisplay;
