import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../api/axios";
import classes from "./CategoriesDisplay.module.css";
import Category from "./Category";

const CategoriesDisplay = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      let items = await createAPIEndpoint(ENDPOINTS.CATEGORIES, METHODS.GET_ALL)
        .fetchAll()
        .then((res) => {
          return res.data;
        });
      setCategories(items);
    };
    getCategories();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Categories</h1>
      {categories.map((category) => (
        <Category
          key={category.id}
          id={category.id}
          name={category.name}
          displayOrder={category.displayOrder}
          createdDateTime={category.createdDateTime}
          products={category.products}
        />
      ))}
    </div>
  );
};

export default CategoriesDisplay;
