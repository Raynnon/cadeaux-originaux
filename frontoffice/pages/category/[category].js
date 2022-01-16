/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from "../../components/Layout";
import Pagination from "../../components/categories/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import slugify from "slugify";

import filterProducts from "../../components/categories/filterProducts";

export default function Category({
  xcategories,
  categories,
  currentCategory,
  defaultSelectedSortBy,
  defaultSelectedGenre,
  defaultSelectedType,
  defaultPrices,
  defaultSelectedOccasion,
  selectedParty
}) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [selectedSortBy, setSelectedSortBy] = useState(defaultSelectedSortBy);
  const [selectedGenre, setSelectedGenre] = useState(defaultSelectedGenre);
  const [selectedType, setSelectedType] = useState(defaultSelectedType);
  const [prices, setPrices] = useState(defaultPrices);
  const [selectedOccasion, setSelectedOccasion] = useState(
    defaultSelectedOccasion
  );
  const [currentPage, selectCurrentPage] = useState(xcategories.currentPage);
  const productsPerPage = xcategories.productsPerPage;
  const categoryName = xcategories.categoryName;

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
                  className="block w-full bg-white border border-gray-100 hover:border-coolGray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
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

            {currentCategory.parent[0] === "Genre" ? null : (
              <div>
                <h4>Genre</h4>
                <ul onChange={(e) => setSelectedGenre(e.target.value)}>
                  {categories.Genre.map((genre, index) => {
                    return (
                      <li key={index} className="flex-grow text-left pr-2">
                        <label className="inline-flex items-center">
                          <input type="radio" name="genre" value={genre.name} />
                          <span className="ml-2">{genre.name}</span>
                        </label>
                      </li>
                    );
                  })}
                  <li className="flex-grow text-left pr-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="genre"
                        value=""
                        defaultChecked
                      />
                      <span className="ml-2">Tout</span>
                    </label>
                  </li>
                </ul>
              </div>
            )}

            {selectedGenre !== "Animal" ? (
              currentCategory.parent[0] === "Type" ? null : (
                <div>
                  <h4>Type</h4>
                  <ul
                    onChange={(e) => {
                      const updatedTypeStatus = {};
                      updatedTypeStatus[e.target.value] =
                        !selectedType[e.target.value];

                      setSelectedType({
                        ...selectedType,
                        ...updatedTypeStatus
                      });
                    }}
                  >
                    {categories.Type.map((type, index) => {
                      if (type.parent.includes(selectedGenre)) {
                        return (
                          <li key={index} className="flex-grow text-left pr-2">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name="Type"
                                value={type.name}
                              />

                              <span className="ml-2">{type.name}</span>
                            </label>
                          </li>
                        );
                      } else if (!selectedGenre) {
                        return (
                          <li key={index} className="flex-grow text-left pr-2">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name="Type"
                                value={type.name}
                              />

                              <span className="ml-2">{type.name}</span>
                            </label>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              )
            ) : null}

            <h4>Prix</h4>
            <ul
              onChange={(e) => {
                const updatedPricesStatus = {};
                updatedPricesStatus[e.target.value] = !prices[e.target.value];

                setPrices({ ...prices, ...updatedPricesStatus });
              }}
            >
              {Object.keys(prices).map((price, index) => {
                return (
                  <li key={index} className="flex-grow text-left pr-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="prix" value={price} />
                      <span className="ml-2">{price}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            {currentCategory.parent[0] === "Fête" ||
            currentCategory.parent[0] === "Occasion" ? null : (
              <div>
                <h4>Occasion</h4>
                <select
                  id="occasion"
                  className="block w-full bg-white border border-coolGray-100 hover:border-coolGray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setSelectedOccasion(e.target.value);
                  }}
                  defaultValue=""
                >
                  {categories.Occasion.map((occasion, index) => {
                    return <option key={index}>{occasion.name}</option>;
                  })}
                  <option value="">Tout</option>
                </select>
              </div>
            )}
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
            {filteredProducts.length
              ? filteredProducts.map((product, index) => {
                  return (
                    <Link
                      key={index}
                      href={{
                        pathname: `/produit/${slugify(product.name)}`,
                        query: {
                          productId: product._id
                        }
                      }}
                    >
                      <a>
                        <div className="flex flex-col border-2 border-coolGray-100 hover:bg-coolGray-100 rounded-lg p-5 mx-1 mt-5 group">
                          {product.images ? (
                            <div>
                              <Image
                                src={product.images[0]}
                                width={225}
                                height={225}
                                layout="responsive"
                                className="rounded-lg"
                              />
                            </div>
                          ) : null}
                          <div className="flex items-center text-center text-xl font-semibold align-middle justify-center h-20">
                            <h2>{product.name}</h2>
                          </div>

                          <div className="flex justify-around items-center">
                            <div>
                              <p className="font-semibold">Prix</p>
                              <p className="text-center">{product.price}</p>
                            </div>
                            <button className="border border-coolGray-300 group-hover:bg-orange-500 group-hover:border-transparent group-hover:text-white rounded-lg p-1 h-9 font-semibold">
                              En savoir plus
                            </button>
                          </div>
                        </div>
                      </a>
                    </Link>
                  );
                })
              : null}
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
    let defaultSelectedSortBy =
      currentCategory.name === "Meilleurs cadeaux"
        ? "Meilleures ventes"
        : "Nouveau";

    let defaultSelectedGenre = currentCategory.parent.includes("Genre")
      ? currentCategory.name
      : "";

    let defaultSelectedType = {};

    let defaultSelectedOccasion = currentCategory.parent.includes("Occasion")
      ? currentCategory.name
      : "";

    let selectedParty = currentCategory.parent.includes("Fête")
      ? currentCategory.name
      : "";

    let defaultPrices = {
      "€": true,
      "€€": true,
      "€€€": true
    };

    // SET FILTERS IN ACCORDANCE TO THE PAGE
    if (currentCategory.parent.includes("Type")) {
      categories.Type.forEach((item) => {
        if (item.name === currentCategory.name) {
          defaultSelectedType[item.name] = true;
        } else {
          defaultSelectedType[item.name] = false;
        }
      });
    } else {
      // INITIATE SELECTED TYPES
      categories.Type.forEach((item) => {
        defaultSelectedType[item.name] = true;
      });
    }

    ////////////////////////////////////////
    const xcategories = {
      categoryName: currentCategory.name,
      selectedSortBy: "Nouveau",
      selectedGenre: [],
      selectedType: [],
      selectedPrices: [],
      selectedOccasion: [],
      selectedParty: [],
      currentPage: 1,
      productsPerPage: 16
    };

    console.log(xcategories);

    return {
      props: {
        xcategories,
        categories,
        currentCategory,
        defaultSelectedSortBy,
        defaultSelectedGenre,
        defaultSelectedType,
        defaultPrices,
        defaultSelectedOccasion,
        selectedParty,
        key: query.category
      }
    };
  } catch (e) {
    console.error(e);
  }
}
