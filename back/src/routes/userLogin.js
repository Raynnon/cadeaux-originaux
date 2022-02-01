import axios from "axios";
import cookieManager from "./cookieManager";

export const userLogin = async (username, password) => {
  try {
    const login = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      username,
      password
    });

    const token = login.data;

    cookieManager(await token);
    const name = login.data.user.name;

    return name;
  } catch (e) {
    return { error: "Login Error : please check your credentials" };
  }
};
