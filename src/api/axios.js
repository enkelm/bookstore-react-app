import axios from "axios";

const BASE_URL = "https://localhost:44384/api/";

export const ENDPOINTS = {
  ACCOUNT: "Account",
  CATEGORIES: "Categories",
  COVER_TYPES: "CoverTypes",
  PRODUCTS: "Products",
};

export const METHODS = {
  GET_ALL: "GetAll",
  GET_ID: "GetById",
  PUT: "Put",
  POST: "Post",
  DELETE: "Delete",
};

export const createAPIEndpoint = (endpoint, method) => {
  let url = BASE_URL + endpoint + "/" + method + "/";

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
