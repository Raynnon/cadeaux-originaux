import axios from "axios";

const putProduct = async (data, productId) => {
  try {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/products/${productId}`,
      data,
      headers: { "Content-Type": "multipart/form-data" }
    });
  } catch (e) {
    console.log(e);
  }
};

export default putProduct;
