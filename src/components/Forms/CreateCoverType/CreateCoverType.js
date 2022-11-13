import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import classes from "./CreateCoverType.module.css";

const CreateCoverType = (props) => {
  const initialFieldValues = {
    id: props.id,
    name: "",
    product: [],
  };

  const { edit, setEdit } = useAuth();
  const [values, setValues] = useState(initialFieldValues);

  const getCoverTypes = async () => {
    await createAPIEndpoint(ENDPOINTS.COVER_TYPES, METHODS.GET_ALL)
      .fetchAll()
      .then((res) => res.data);
  };

  const deleteHandler = async () => {
    await createAPIEndpoint(ENDPOINTS.COVER_TYPES, METHODS.DELETE)
      .delete(values.id)
      .catch((error) => console.log(error));
    props.close();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let newData = {
      name: values.name,
    };

    if (values === initialFieldValues) {
      props.close();
      return;
    }
    if (edit) {
      await createAPIEndpoint(ENDPOINTS.COVER_TYPES, METHODS.PUT)
        .update(values.id, newData)
        .catch((error) => console.log(error));
    } else {
      await createAPIEndpoint(ENDPOINTS.COVER_TYPES, METHODS.POST)
        .create(newData)
        .catch((error) => console.log(error));
    }
    props.close();
  };

  const coverType = {
    id: props.id,
    name: props.name,
    product: props.product,
  };

  useEffect(() => {
    if (edit)
      setValues((prevState) => {
        return { ...prevState, ...coverType };
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
          <h3 style={{ marginBottom: "0" }}>Edit Cover Type</h3>
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
          <h3 style={{ marginBottom: "0" }}>Create Cover Type</h3>
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
          <div className={classes.action}>
            <Button type={"submit"} onClick={submitHandler}>
              Submit
              <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "1rem" }} />
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default CreateCoverType;
