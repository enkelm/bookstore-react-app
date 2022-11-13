import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./Category.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import ModalService from ".././../UI/Modal/services/ModalServices";
import CreateCategory from "../../Forms/CreateCategory/CreateCategory";
import useAuth from "../../../hooks/useAuth";

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const Category = (props) => {
  const { setEdit } = useAuth();

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const showEdit = () => {
    setEdit(true);
    ModalService.open(CreateCategory, props);
  };

  return (
    <Card className={classes.item}>
      <h3>{props.name}</h3>
      <Button
        onClick={showEdit}
        className={windowSize.innerWidth < 768 ? classes.iconBtn : ""}
        style={
          windowSize.innerWidth < 768
            ? { marginRight: "0.5rem" }
            : { marginRight: "1rem" }
        }
      >
        {windowSize.innerWidth > 768 ? "Edit" : ""}
        <FontAwesomeIcon
          icon={faEdit}
          style={windowSize.innerWidth > 768 ? { marginLeft: "0.5rem" } : {}}
        />
      </Button>
    </Card>
  );
};

export default Category;
