import Cookies from "universal-cookie";

const cookieManager = (token) => {
  const cookies = new Cookies();

  if (token && token !== "delete") {
    token !== "anonymous"
      ? cookies.set("token", token)
      : cookies.set("token", "anonymous");
  } else if (token === "delete") {
    cookies.remove("token");
  } else {
    return cookies.get("token");
  }
};

export default cookieManager;
