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
    { count },
    { images: true }
  ];

  // Filter parameters that are not All
  const filteredParameters = parameters.filter(
    (item) => item[Object.keys(item)]
  );

  // Push each filtered parameters in option array
  const options = filteredParameters.map((param) => {
    return `${Object.keys(param)}=${param[Object.keys(param)]}`;
  });

  const optionsReq = options.length ? `?${options.join("&")}` : ``;

  ////////////////////

  const parametersName = {
    sortBy: selectedSortBy,
    currentPage: currentPage,
    productsPerPage: productsPerPage
  };

  const newOptions = Object.entries(parametersName)
    .filter(([k, v]) => {
      return v;
    })
    .map((item) => {
      return `${item[0]}=${item[1]}`;
    })
    .join("&");

  optionsReq += `&${newOptions}`;

  /////////////////////////

  const dataProducts = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products${optionsReq}`
  );

  return dataProducts.data;
};

module.exports = filteredProducts;
