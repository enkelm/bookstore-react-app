import classes from "./NavBar.module.css";

const NavBar = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Create Product</a>
        </li>
        <li>
          <a href="/">Create Category</a>
        </li>
        <li>
          <a href="/">Create Cover Type</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
