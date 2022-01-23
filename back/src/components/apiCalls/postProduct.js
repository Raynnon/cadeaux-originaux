import axios from "axios";

const postProduct = async (data) => {
  try {
    await axios({
      method: "post",
      url: process.env.REACT_APP_API_URL + "/products",
      data,
      headers: { "Content-Type": "multipart/form-data" }
    });
  } catch (e) {
    console.log(e);
  }
};

export default postProduct;
