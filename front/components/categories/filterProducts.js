import axios from "axios";

const filteredProducts = async (
  selectedGenre,
  prices,
  selectedType,
  selectedOccasion,
  selectedParty,
  selectedSortBy,
  currentPage,
  productsPerPage
) => {
  const options = [];
  //transform parameters with multiple values to string
  const chechboxParamToString = (obj) => {
    const filter = Object.keys(obj).filter((key) => {
      if (obj[key]) {
        return key;
      }
    });

    return filter.join(",");
  };

  // If there is no specified page so we retun the count of documents
  let count = false;

  if (!currentPage && !productsPerPage) {
    count = true;
  }

  const parameters = [
    { whoKind: selectedGenre },
    { price: chechboxParamToString(prices) },
    { whoType: chechboxParamToString(selectedType) },
    { occasions: selectedOccasion },
    { parties: selectedParty },
    { sortBy: selectedSortBy },
    { currentPage },
    { productsPerPage },
    { count }
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
