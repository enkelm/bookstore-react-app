import CategoriesDisplay from "./CategoriesDisplay/CategoriesDisplay";
import CoverTypesDisplay from "./CoverTypesDisplay/CoverTypesDisplay";
import classes from "./PropertiesPage.module.css";

const PropertiesPage = () => {
  return (
    <div className={classes.wrapper}>
      <CategoriesDisplay />
      <CoverTypesDisplay />
    </div>
  );
};

export default PropertiesPage;
