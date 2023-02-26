import axios from "axios";

const API_PRODUCT =
  "https://run.mocky.io/v3/ab28e30c-599f-4d1e-9bd6-1e49ec078138";

const getProduct = () => {
  return axios.get(API_PRODUCT);
};

export default {
  getProduct,
};
