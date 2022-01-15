import axios from "axios";

const readProducts = async () => {
  const products = await axios.get(process.env.REACT_APP_API_URL + "/products");

  return products.data;
};

export default readProducts;
