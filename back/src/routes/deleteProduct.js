import axios from "axios";
import cookieManager from "./cookieManager";

const deleteProduct = async (productId) => {
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/products/${productId}`,
      headers: {
        Authorization: `Bearer ${cookieManager()}`
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export default deleteProduct;
