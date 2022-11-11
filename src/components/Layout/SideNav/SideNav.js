import { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import ModalService from "../../UI/Modal/services/ModalServices";
import CreateBook from "../../Forms/CreateBook/CreateBook";
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../api/axios";
import {
  faBookMedical,
  faCircleInfo,
  faHome,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gitImage from "../../../assets/images/github-icon.svg";
import classes from "./SideNav.module.css";

const SideNav = (props) => {
  const { auth } = useAuth();

  const [sideNavWidth, setSideNavWidth] = useState("0");

  useEffect(() => {
    if (sideNavWidth === "0" && props.width < 768) setSideNavWidth("60%");
    else if (sideNavWidth === "0") setSideNavWidth("25%");
    else setSideNavWidth("0");
  }, []);

  const showCreateBook = () => {
    ModalService.open(CreateBook);
  };

  return (
    <Modal className={classes.sidenav} style={{ width: sideNavWidth }}>
      <div className={classes[`sidenav__item`]}>
        <FontAwesomeIcon icon={faHome} style={{ marginRight: "1rem" }} />
        <a href="#">Home</a>
      </div>
      <div className={classes[`sidenav__item`]}>
        <FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: "1rem" }} />
        <a href="#">About Us</a>
      </div>
      <div className={classes[`sidenav__item`]}>
        <FontAwesomeIcon icon={faMessage} style={{ marginRight: "1rem" }} />
        <a href="#">Help</a>
      </div>
      <div className={classes[`sidenav__item`]}>
        <img src={gitImage} style={{ marginRight: "1rem" }} />
        <a href="https://github.com/enkelm/bookstore-react-app" target="_blank">
          Git Repo
        </a>
      </div>
      {auth.role === ROLES.ADMIN && (
        <div className={classes[`sidenav__item`]}>
          <FontAwesomeIcon
            icon={faBookMedical}
            style={{ marginRight: "1rem" }}
          />
          <a href="#" onClick={showCreateBook}>
            Create Book
          </a>
        </div>
      )}
    </Modal>
  );
};

export default SideNav;
