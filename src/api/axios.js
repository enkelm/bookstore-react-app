import axios from "axios";

const BASE_URL = "https://localhost:44384/api/";

export const ENDPOINTS = {
  ACCOUNT: "Account",
  CATEGORIES: "Categories",
  COVER_TYPES: "CoverTypes",
  PRODUCTS: "Products",
  SHOPPING_CART: "ShoppingCart",
};

export const METHODS = {
  GET_ALL: "GetAll",
  GET_ID: "GetById",
  PUT: "Put",
  POST: "Post",
  DELETE: "Delete",
};

export const ROLES = {
  ADMIN: "Administrator",
  USER: "User",
};

export const createAPIEndpoint = (endpoint, method) => {
  const JWT = localStorage.getItem("access_token").replace(/['"]+/g, "");

  axios.defaults.headers.post["Authorization"] = `Bearer ${JWT}`;
  axios.defaults.headers.delete["Authorization"] = `Bearer ${JWT}`;
  axios.defaults.headers.put["Authorization"] = `Bearer ${JWT}`;
  let url = BASE_URL + endpoint + "/" + method + "/";

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
