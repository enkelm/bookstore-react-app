import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import bannerImage from "../../../assets/images/test-banner.png";
import useAuth from "../../../hooks/useAuth";
import ModalService from "../../UI/Modal/services/ModalServices";
import Button from "../../UI/Button/Button";
import Register from "../../Authentication/Register/Register";
import Login from "../../Authentication/Login/Login";
import HeaderUser from "./HeaderUser";
import Cart from "../../Cart/Cart";
import CreateBook from "../../Forms/CreateBook/CreateBook";
import { ROLES } from "../../../api/axios";
import SideNav from "../SideNav/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const Header = (props) => {
  const { auth } = useAuth();

  const navigate = useNavigate();

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

  const loginStatus = localStorage.getItem("isLoggedIn");

  const showCart = () => {
    ModalService.open(Cart);
  };

  const showLogin = () => {
    navigate("/login");
  };

  const showRegister = () => {
    navigate("/register");
  };

  const showSideNav = () => {
    ModalService.open(SideNav, { width: windowSize.innerWidth });
  };

  return (
    <>
      <header className={classes.header}>
        <Button className={classes[`sidenav-btn`]} onClick={showSideNav}>
          <FontAwesomeIcon icon={faBars} style={{ height: "1.5rem" }} />
        </Button>
        <h1>
          {windowSize.innerWidth < 768 && loginStatus !== ""
            ? ""
            : "ReactBookStore"}
        </h1>

        <div className={loginStatus === "" ? classes.items : ""}>
          {loginStatus && (
            <HeaderCartButton
              onClick={showCart}
              phoneDisplay={windowSize.innerWidth < 768}
            />
          )}
        </div>

        {!loginStatus && (
          <Button
            onClick={showLogin}
            className={windowSize.innerWidth < 768 ? classes.iconBtn : ""}
          >
            {windowSize.innerWidth > 768 ? "Login" : ""}
            <FontAwesomeIcon
              icon={faRightToBracket}
              style={
                windowSize.innerWidth > 768 ? { marginLeft: "0.5rem" } : {}
              }
            />
          </Button>
        )}

        {!loginStatus && (
          <Button
            onClick={showRegister}
            className={windowSize.innerWidth < 768 ? classes.iconBtn : ""}
            style={
              windowSize.innerWidth < 768
                ? { marginRight: "0.5rem" }
                : { marginRight: "1rem" }
            }
          >
            {windowSize.innerWidth > 768 ? "Register" : ""}
            <FontAwesomeIcon
              icon={faUserPlus}
              style={
                windowSize.innerWidth > 768 ? { marginLeft: "0.5rem" } : {}
              }
            />
          </Button>
        )}
        {loginStatus && <HeaderUser />}
      </header>
      <div className={classes["main-image"]}>
        <img src={bannerImage} />
      </div>
    </>
  );
};

export default Header;
