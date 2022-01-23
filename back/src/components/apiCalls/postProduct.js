import axios from "axios";

const postProduct = async (
  name,
  price,
  description,
  strongPoints,
  whoType,
  whoKind,
  occasions,
  parties,
  images,
  url
) => {
  const data = new FormData();

  data.append("name", name);
  data.append("price", price);
  data.append("description", description);
  strongPoints.forEach((sp) => {
    data.append("strongPoints", sp);
  });
  whoType.forEach((type) => {
    data.append("whoType", type);
  });
  whoKind.forEach((kind) => {
    data.append("whoKind", kind);
  });
  occasions.forEach((occasion) => {
    data.append("occasions", occasion);
  });
  parties.forEach((party) => {
    data.append("parties", party);
  });
  images.forEach((image) => {
    data.append("image", image);
  });
  data.append("urlAmazon", url);

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
