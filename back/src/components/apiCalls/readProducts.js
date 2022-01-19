import axios from "axios";

const readProducts = async (options) => {
  let formatedOptions = options
    ? Object.entries(options)
        .map((options) => {
          console.log(options);
          return `${options[0]}=${options[1]}`;
        })
        .join("&")
    : "";

  const products = await axios.get(
    `${process.env.REACT_APP_API_URL}/products?${formatedOptions}`
  );
  console.log(formatedOptions);
  return products.data;
};

export default readProducts;
