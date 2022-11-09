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

const Header = (props) => {
  const { auth } = useAuth();

  const showCart = () => {
    ModalService.open(Cart);
  };

  const showLogin = () => {
    ModalService.open(Login);
  };

  const showRegister = () => {
    ModalService.open(Register);
  };

  const showCreateBook = () => {
    ModalService.open(CreateBook);
  };

  return (
    <>
      <header className={classes.header}>
        <h1>ReactBookStore</h1>
        {auth.token && <Button onClick={showCreateBook}>Create Book</Button>}
        {auth.token && <HeaderCartButton onClick={showCart} />}
        {!auth.token && <Button onClick={showLogin}>Login</Button>}
        {!auth.token && <Button onClick={showRegister}>Register</Button>}
        {auth.token && <HeaderUser />}
      </header>
      <div className={classes["main-image"]}>
        <img src={bannerImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
