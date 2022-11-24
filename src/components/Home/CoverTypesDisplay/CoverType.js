import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import CreateCoverType from "../../Forms/CreateCoverType/CreateCoverType";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import ModalService from "../../UI/Modal/services/ModalServices";
import classes from "./CoverType.module.css";

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const CoverType = (props) => {
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
    ModalService.open(CreateCoverType, props);
  };

  return (
    <Card className={`${classes.item} animate__animated animate__zoomIn`}>
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

export default CoverType;
