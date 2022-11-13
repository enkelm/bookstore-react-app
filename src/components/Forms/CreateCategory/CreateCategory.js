import classes from "./CreateCategory.module.css";
import Modal from "../../UI/Modal/Modal";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../api/axios";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CreateCategory = (props) => {
  const initialFieldValues = {
    id: props.id,
    name: "",
    displayOrder: 0,
    createdDateTime: props.createdDateTime,
    product: [],
  };

  const { edit, setEdit } = useAuth();
  const [values, setValues] = useState(initialFieldValues);

  const getCoverTypes = async () => {
    await createAPIEndpoint(ENDPOINTS.CATEGORIES, METHODS.GET_ALL)
      .fetchAll()
      .then((res) => res.data);
  };

  const deleteHandler = async () => {
    await createAPIEndpoint(ENDPOINTS.CATEGORIES, METHODS.DELETE)
      .delete(values.id)
      .catch((error) => console.log(error));
    props.close();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let newData = {
      name: values.name,
      displayOrder: values.displayOrder,
      createdDateTime: props.createdDateTime,
    };

    if (values === initialFieldValues) {
      props.close();
      return;
    }
    if (edit) {
      await createAPIEndpoint(ENDPOINTS.CATEGORIES, METHODS.PUT)
        .update(values.id, newData)
        .catch((error) => console.log(error));
    } else {
      await createAPIEndpoint(ENDPOINTS.CATEGORIES, METHODS.POST)
        .create(newData)
        .catch((error) => console.log(error));
    }
    props.close();
  };

  const category = {
    id: props.id,
    name: props.name,
    displayOrder: props.displayOrder,
    createdDateTime: props.createdDateTime,
    product: props.product,
  };

  useEffect(() => {
    if (edit)
      setValues((prevState) => {
        return { ...prevState, ...category };
      });
  }, []);

  return (
    <Modal className={classes.card}>
      {edit ? (
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={submitHandler}
        >
          <h3 style={{ marginBottom: "0" }}>Edit Category Type</h3>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={(event) =>
                setValues((prevState) => {
                  return { ...prevState, name: event.target.value };
                })
              }
            />
          </div>
          <div>
            <label htmlFor="order">Display Order</label>
            <input
              id="order"
              type="number"
              value={values.displayOrder}
              onChange={(event) =>
                setValues((prevState) => {
                  return { ...prevState, displayOrder: event.target.value };
                })
              }
            />
          </div>
          <div className={classes.action}>
            <Button type={"submit"} onClick={submitHandler}>
              Edit
              <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "1rem" }} />
            </Button>
            <Button secondaryBtn={true} onClick={deleteHandler}>
              Delete
              <FontAwesomeIcon icon={faTrash} style={{ marginLeft: "1rem" }} />
            </Button>
          </div>
        </form>
      ) : (
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={submitHandler}
        >
          <h3 style={{ marginBottom: "0" }}>Create Category Type</h3>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={(event) =>
                setValues((prevState) => {
                  return { ...prevState, name: event.target.value };
                })
              }
            />
          </div>
          <div>
            <label htmlFor="order">Display Order</label>
            <input
              id="order"
              type="number"
              value={values.displayOrder}
              onChange={(event) =>
                setValues((prevState) => {
                  return { ...prevState, displayOrder: event.target.value };
                })
              }
            />
          </div>
          <section className={classes.action}>
            <Button type={"submit"} onClick={submitHandler}>
              Submit
              <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "1rem" }} />
            </Button>
          </section>
        </form>
      )}
    </Modal>
  );
};

export default CreateCategory;
