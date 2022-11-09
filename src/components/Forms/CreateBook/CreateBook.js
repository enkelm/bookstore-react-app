import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import Modal from "../../UI/Modal/Modal";
import classes from "./CreateBook.module.css";

const initialFieldValues = {
  title: "",
  description: "",
  isbn: "",
  author: "",
  listPrice: 0,
  price: 0,
  price50: 0,
  price100: 0,
  imageUrl: "",
  image: null,
  categoryId: 0,
  coverTypeId: 0,
};

const CreateBook = (props) => {
  const { setBooksCtx, edit, booksCtx, bookId } = useAuth();
  const [values, setValue] = useState(initialFieldValues);

  const getBooks = async () => {
    let items = await createAPIEndpoint(ENDPOINTS.PRODUCTS, METHODS.GET_ALL)
      .fetchAll()
      .then((res) => {
        return res.data;
      });
    // setBooks(items);
    setBooksCtx(items);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }
    if (values === initialFieldValues) {
      props.close();
      return;
    }
    if (edit) {
      await createAPIEndpoint(ENDPOINTS.PRODUCTS, METHODS.PUT)
        .update(book.id, formData)
        .catch((error) => console.log(error));
      getBooks();
    } else {
      await createAPIEndpoint(ENDPOINTS.PRODUCTS, METHODS.POST)
        .create(formData)
        .catch((error) => console.log(error));
      getBooks();
    }
    props.close();
  };

  const book = booksCtx[bookId];

  useEffect(() => {
    if (edit)
      setValue((prevState) => {
        return { ...prevState, ...book };
      });
  }, []);

  return (
    <Modal className={classes.card}>
      {edit ? (
        <Card className={classes.card}>
          <form
            autoComplete="off"
            className={classes.form}
            onSubmit={submitHandler}
          >
            <h3 style={{ marginBottom: "0" }}>Edit Book</h3>
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={values.title}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, title: event.target.value };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="desc">Description</label>
              <input
                id="desc"
                type="text"
                value={values.description}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, description: event.target.value };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="isbn">ISBN</label>
              <input
                id="isbn"
                type="text"
                value={values.isbn}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, isbn: event.target.value };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                value={values.author}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, author: event.target.value };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="list-price">List Price</label>
              <input
                id="list-price"
                type="number"
                value={values.listPrice}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      listPrice: parseFloat(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={values.price}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      price: parseFloat(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="price50">Price for 50</label>
              <input
                id="price50"
                type="number"
                value={values.price50}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      price50: parseFloat(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="price100">Price for 100</label>
              <input
                id="price100"
                type="number"
                value={values.price100}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      price100: parseFloat(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                id="imageFile"
                type={"file"}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, image: event.target.files[0] };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="category-id">Category Id</label>
              <input
                id="category-id"
                type="number"
                value={values.categoryId}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      categoryId: parseInt(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="cover-type-id">Cover Type Id</label>
              <input
                id="cover-type-id"
                type="number"
                value={values.coverTypeId}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      coverTypeId: parseInt(event.target.value),
                    };
                  })
                }
              />
            </div>

            <Button type={"submit"}>Submit</Button>
          </form>
        </Card>
      ) : (
        <Card className={classes.card}>
          <form
            autoComplete="off"
            className={classes.form}
            onSubmit={submitHandler}
          >
            <h3 style={{ marginBottom: "0" }}>Create Book</h3>
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={values.title}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, title: event.target.value };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="desc">Description</label>
              <input
                id="desc"
                type="text"
                value={values.description}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, description: event.target.value };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="isbn">ISBN</label>
              <input
                id="isbn"
                type="text"
                value={values.isbn}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, isbn: event.target.value };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                value={values.author}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, author: event.target.value };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="list-price">List Price</label>
              <input
                id="list-price"
                type="number"
                value={values.listPrice}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      listPrice: parseFloat(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={values.price}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      price: parseFloat(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="price50">Price for 50</label>
              <input
                id="price50"
                type="number"
                value={values.price50}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      price50: parseFloat(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="price100">Price for 100</label>
              <input
                id="price100"
                type="number"
                value={values.price100}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      price100: parseFloat(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                id="imageFile"
                type={"file"}
                onChange={(event) =>
                  setValue((prevState) => {
                    return { ...prevState, image: event.target.files[0] };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="category-id">Category Id</label>
              <input
                id="category-id"
                type="number"
                value={values.categoryId}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      categoryId: parseInt(event.target.value),
                    };
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="cover-type-id">Cover Type Id</label>
              <input
                id="cover-type-id"
                type="number"
                value={values.coverTypeId}
                onChange={(event) =>
                  setValue((prevState) => {
                    return {
                      ...prevState,
                      coverTypeId: parseInt(event.target.value),
                    };
                  })
                }
              />
            </div>

            <Button type={"submit"}>Submit</Button>
          </form>
        </Card>
      )}
    </Modal>
  );
};

export default CreateBook;
