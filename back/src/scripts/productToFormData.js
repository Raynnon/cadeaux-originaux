const productToFormData = (
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
  const productFormData = {
    name,
    price,
    description,
    strongPoints,
    whoType,
    whoKind,
    occasions,
    parties,
    image: images,
    urlAmazon: url
  };

  const data = new FormData();

  Object.entries(productFormData).forEach(([key, value]) => {
    if (value) {
      if (["name", "price", "description", "urlAmazon"].includes(key)) {
        data.append(key, value);
      } else {
        value.forEach((item) => {
          data.append(key, item);
        });
      }
    }
  });

  return data;
};

export default productToFormData;
