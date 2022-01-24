const productToFormData = (product) => {
  const data = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (value && key !== "_id") {
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
