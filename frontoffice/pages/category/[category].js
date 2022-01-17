/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from "../../components/Layout";
import Pagination from "../../components/categories/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";

import filterProducts from "../../components/categories/filterProducts";
import CheckboxRadio from "../../components/categories/CheckboxRadio";
import Select from "../../components/categories/Select.js";
import ProductsCard from "../../components/categories/ProductsCard";

export default function Category({ filters, categories, currentCategory }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [selectedSortBy, setSelectedSortBy] = useState(filters.sortBy);
  const [selectedGenre, setSelectedGenre] = useState(filters.selectedGenre);
  const [selectedType, setSelectedType] = useState(filters.selectedType);
  const [prices, setPrices] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState(
    filters.selectedOccasion
  );
  const [selectedParty, setSelectedParty] = useState(filters.selectedParty);
  const [currentPage, selectCurrentPage] = useState(filters.currentPage);
  const productsPerPage = filters.productsPerPage;
  const categoryName = filters.categoryName;

  // GET PRODUCTS ON FILTER CHANGE
  useEffect(async () => {
    const products = await filterProducts(
      selectedGenre,
      prices,
      selectedType,
      selectedOccasion,
      selectedParty,
      selectedSortBy,
      currentPage,
      productsPerPage
    );

    setFilteredProducts(products);

    //SETUP MAX PRODUCTS FOR PAGINATION
    const maxProducts = await filterProducts(
      selectedGenre,
      prices,
      selectedType,
      selectedOccasion,
      selectedParty
    );

    setNumberOfProducts(maxProducts.numberOfProducts);
  }, [
    selectedGenre,
    selectedOccasion,
    selectedParty,
    prices,
    selectedType,
    selectedSortBy,
    currentPage,
    productsPerPage
  ]);

  const onUpdateCurrentPage = (page) => {
    selectCurrentPage(Number(page));
  };

  const pageTitle = () => {
    if (categoryName === "Nouveau") {
      return "Nouveaux cadeaux - Mes cadeaux originaux";
    } else if (categoryName === "Meilleurs cadeaux") {
      return "Meilleurs cadeaux - Mes cadeaux originaux";
    } else {
      return `Cadeau pour ${categoryName} - Mes cadeaux originaux`;
    }
  };

  return (
    <Layout pageTitle={pageTitle()} description={currentCategory.description}>
      <div className="flex -mb-10">
        {/* FILTER */}
        <aside className="hidden px-1 md:block pb-5 pt-4 xl:pl-32 lg:pl-5 lg:pr:5 xl:pl-10 xl:pr-10 bg-coolGray-100">
          <form className="xl:w-52">
            {categoryName === "Nouveau" ||
            categoryName === "Meilleurs cadeaux" ? null : (
              <ul>
                <label htmlFor="sort">
                  <h4>Classer par:</h4>
                </label>
                <select
                  id="sorts"
                  className="block w-full bg-white hover:border-coolGray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setSelectedSortBy(e.target.value);
                  }}
                  defaultValue={selectedSortBy}
                >
                  <option value="Nouveau">Nouveau</option>
                  <option value="Meilleures ventes">Meilleures ventes</option>
                </select>
              </ul>
            )}

            {currentCategory.parent.includes("Genre") ? null : (
              <div>
                <h4>Genre</h4>
                <ul onChange={(e) => setSelectedGenre(e.target.value)}>
                  {categories.Genre.map((genre, index) => {
                    return (
                      <CheckboxRadio
                        key={index}
                        type="radio"
                        value={genre.name}
                        name="genre"
                      />
                    );
                  })}
                  <CheckboxRadio
                    type="radio"
                    value=""
                    description={"Tout"}
                    name="genre"
                    checked
                  />
                </ul>
              </div>
            )}

            {!currentCategory.parent.includes("Type") &&
            selectedGenre !== "Animal" ? (
              <div>
                <h4>Type</h4>
                <ul>
                  {categories.Type.filter(
                    (type) =>
                      type.parent.includes(selectedGenre) ||
                      currentCategory !== "Nouveau" ||
                      currentCategory !== "Meilleurs cadeaux"
                  ).map((filteredType, index) => {
                    if (
                      filteredType.parent.includes(selectedGenre) ||
                      !selectedGenre
                    ) {
                      return (
                        <CheckboxRadio
                          key={index}
                          type="checkbox"
                          value={filteredType.name}
                          name="Type"
                          changeCategoryHandler={(changedCategory) => {
                            if (selectedType.includes(changedCategory)) {
                              setSelectedType(
                                selectedType.filter(
                                  (type) => type !== changedCategory
                                )
                              );
                            } else {
                              setSelectedType([
                                ...selectedType,
                                changedCategory
                              ]);
                            }
                          }}
                        />
                      );
                    }
                  })}
                </ul>
              </div>
            ) : null}

            <h4>Prix</h4>
            <ul>
              {["€", "€€", "€€€"].map((price, index) => {
                return (
                  <CheckboxRadio
                    key={index}
                    type="checkbox"
                    value={price}
                    name="prix"
                    checked={prices.includes(price)}
                    changeCategoryHandler={(changedPrice) => {
                      if (prices.includes(changedPrice)) {
                        setPrices(
                          prices.filter((price) => price !== changedPrice)
                        );
                      } else {
                        setPrices([...prices, changedPrice]);
                      }
                    }}
                  />
                );
              })}
            </ul>
            {!selectedParty && !currentCategory.parent.includes("Occasion") ? (
              <Select
                categoryName="Occasion"
                category={categories.Occasion}
                changeCategoryHandler={(categoryName) => {
                  setSelectedOccasion(categoryName);
                }}
              />
            ) : null}
            {!selectedOccasion && !currentCategory.parent.includes("Fête") ? (
              <Select
                categoryName="Fête"
                category={categories.Fête}
                changeCategoryHandler={(categoryName) => {
                  setSelectedParty(categoryName);
                }}
              />
            ) : null}
          </form>
        </aside>

        <main className="mx-1 mt-6 lg:pl-5 xl:pr-20">
          <h1 className="text-4xl font-semibold">{`${categoryName}`}</h1>
          <p className="my-5 text-justify">{currentCategory.description}</p>

          <Pagination
            numberOfProducts={numberOfProducts}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            updateCurrentPage={onUpdateCurrentPage}
          />

          {/*PRODUCTS */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between mb-10 min-w-full">
            {filteredProducts.map((product, index) => {
              return (
                <ProductsCard
                  key={index}
                  cardNumber={index}
                  productId={product._id}
                  productName={product.name}
                  productPrice={product.price}
                  productImages={product.images}
                />
              );
            })}
          </div>

          <Pagination
            numberOfProducts={numberOfProducts}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            updateCurrentPage={onUpdateCurrentPage}
            details={true}
          />
        </main>
      </div>
      <style global jsx>{`
        h4 {
          margin-top: 10px;
          font-weight: 600;
          font-size: 1.25rem;
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { category } = query;

    const formatedCategoryName =
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");

    let currentCategory = {};

    if (formatedCategoryName === "Nouveau") {
      currentCategory = {
        name: formatedCategoryName,
        description:
          "Trouvez tous nos nouveaux cadeaux mis en ligne. Si vous cherchez un cadeau vraiment original alors n'hésitez pas à parcourir cette liste d'articles récents.",
        parent: [""]
      };
    } else if (formatedCategoryName === "Meilleurs cadeaux") {
      currentCategory = {
        name: formatedCategoryName,
        description:
          "Retrouvez nos articles les plus vendus sur cette page. En choisissant parmi nos meilleurs cadeaux, vous vous assurez de faire plaisir à ceux qui les recevront!",
        parent: [""]
      };
    } else {
      const dataCurrentCategories = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/?name=${formatedCategoryName}`
      );

      currentCategory = dataCurrentCategories.data[0];
    }

    // GET CATEGORIES
    const dataCategories = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/?ordered=true`
    );

    const categories = dataCategories.data;

    // INITIATE DEFAULT FILTERS
    let sortBy =
      currentCategory.name === "Meilleurs cadeaux"
        ? "Meilleures ventes"
        : "Nouveau";

    let selectedGenre = currentCategory.parent.includes("Genre")
      ? currentCategory.name
      : "";

    let selectedOccasion = currentCategory.parent.includes("Occasion")
      ? currentCategory.name
      : "";

    let selectedParty = currentCategory.parent.includes("Fête")
      ? currentCategory.name
      : "";

    const selectedType = currentCategory.parent.includes("Type")
      ? [currentCategory.name]
      : [];

    const filters = {
      categoryName: currentCategory.name,
      sortBy,
      selectedGenre,
      selectedType: selectedType,
      selectedOccasion,
      selectedParty,
      currentPage: 1,
      productsPerPage: 16
    };

    return {
      props: {
        filters,
        categories,
        currentCategory,
        key: query.category
      }
    };
  } catch (e) {
    console.error(e);
  }
}
