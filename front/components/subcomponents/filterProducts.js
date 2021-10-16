import axios from "axios";

const filteredProducts = async (
  selectedGenre,
  prices,
  selectedType,
  selectedOccasion,
  selectedParty
) => {
  const options = [];
  const filterParameters = (obj) => {
    const filter = Object.keys(obj).filter((key) => {
      if (obj[key]) {
        return key;
      }
    });

    return filter.join(",");
  };

  const parameters = [
    { whoKind: selectedGenre },
    { price: filterParameters(prices) },
    { whoType: filterParameters(selectedType) },
    { occasions: selectedOccasion },
    { parties: selectedParty }
  ];

  // Filter parameters that are not All
  const filteredParameters = parameters.filter(
    (item) => item[Object.keys(item)] != "Tout"
  );

  // Push each filtered parameters in option array
  filteredParameters.forEach((param) => {
    options.push(`${Object.keys(param)}=${param[Object.keys(param)]}`);
  });

  const optionsReq = options.length ? `?${options.join("&")}` : ``;
  const dataProducts = await axios.get(
    `http://localhost:4000/products${optionsReq}`
  );

  return dataProducts.data;
};

module.exports = filteredProducts;
