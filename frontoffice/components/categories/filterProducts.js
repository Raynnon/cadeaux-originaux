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
  // If there is no specified page so we retun the count of documents
  let count = !currentPage && !productsPerPage;

  const parametersName = {
    sortBy: selectedSortBy,
    currentPage: currentPage,
    productsPerPage: productsPerPage,
    whoKind: selectedGenre,
    whoType: selectedType.join(","),
    price: prices.join(","),
    occasions: selectedOccasion,
    parties: selectedParty,
    count,
    images: true
  };

  const newOptions = Object.entries(parametersName)
    .filter(([k, v]) => {
      return v;
    })
    .map((item) => {
      return `${item[0]}=${item[1]}`;
    })
    .join("&");

  const dataProducts = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${newOptions}`
  );

  return dataProducts.data;
};

module.exports = filteredProducts;
