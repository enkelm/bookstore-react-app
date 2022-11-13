import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS, METHODS } from "../../../api/axios";
import CoverType from "./CoverType";
import classes from "./CoverTypesDisplay.module.css";

const CoverTypesDisplay = (props) => {
  const [coverTypes, setCoverTypes] = useState([]);

  useEffect(() => {
    const getCoverTypes = async () => {
      let items = await createAPIEndpoint(
        ENDPOINTS.COVER_TYPES,
        METHODS.GET_ALL
      )
        .fetchAll()
        .then((res) => res.data);
      setCoverTypes(items);
    };
    getCoverTypes();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Cover Types</h1>
      {coverTypes.map((coverType) => (
        <CoverType
          key={coverType.id}
          id={coverType.id}
          name={coverType.name}
          products={coverType.products}
        />
      ))}
    </div>
  );
};

export default CoverTypesDisplay;
