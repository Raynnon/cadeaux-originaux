/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from "../../components/Layout";
import Pagination from "../../components/categories/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import slugify from "slugify";
import { useRouter } from "next/router";

import filterProducts from "../../components/categories/filterProducts";

export default function Category({ categories }) {
  const [currentCategory, setCurrentCategory] = useState({
    _id: "",
    parent: [""],
    name: ""
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("Nouveau");
  const [selectedGenre, setSelectedGenre] = useState("Tout");
  const [selectedType, setSelectedType] = useState({});
  const [prices, setPrices] = useState({ "€": true, "€€": true, "€€€": true });
  const [selectedOccasion, setSelectedOccasion] = useState("Tout");
  const [selectedParty, setSelectedParty] = useState("Tout");

  const [currentPage, selectCurrentPage] = useState(1);
  const productsPerPage = 16;

  const router = useRouter();

  const getProducts = async () => {
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
  };

  const refreshTypes = () => {
    const typeObj = {};

    categories.Type.forEach((item) => {
      typeObj[item.name] = true;
    });

    setSelectedType({ ...selectedType, ...typeObj });
  };

  useEffect(async () => {
    //RESET FILTER VARIABLES TO DEFAULT
    setSelectedSortBy("Nouveau");
    setSelectedGenre("Tout");
    setPrices({ "€": true, "€€": true, "€€€": true });
    setSelectedOccasion("Tout");
    setSelectedParty("Tout");
    refreshTypes();

    // FORMATE THE CATEGORY NAME
    const { category } = router.query;

    const formatedCategoryName =
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");

    if (
      formatedCategoryName === "Nouveau" ||
      formatedCategoryName === "Meilleurs cadeaux"
    ) {
      setCurrentCategory({
        name: formatedCategoryName,
        description: "",
        parent: [""]
      });
    } else {
      const dataCurrentCategories = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}categories/?name=${formatedCategoryName}`
      );

      const pageCategory = dataCurrentCategories.data[0];

      setCurrentCategory(pageCategory);
    }

    const { name: categoryName } = currentCategory;

    // ASSIGN FILTERS TO SHOW
    if (categoryName === "Nouveau" || categoryName === "Meilleurs cadeaux") {
      if (categoryName === "Meilleurs cadeaux") {
        setSelectedSortBy("Meilleures ventes");
      }
    } else {
      if (currentCategory.parent[0] === "Genre") {
        setSelectedGenre(categoryName);
      } else if (currentCategory.parent[0] === "Type") {
        setSelectedGenre("Tout");
        const updatedSelectedType = {};
        Object.keys(selectedType).forEach((item) => {
          if (item === categoryName) {
            updatedSelectedType[item] = true;
          } else {
            updatedSelectedType[item] = false;
          }
        });

        setSelectedType({ ...selectedType, ...updatedSelectedType });
      } else if (currentCategory.parent[0] === "Occasion") {
        setSelectedOccasion(categoryName);
        setSelectedParty("Tout");
      } else if (currentCategory.parent[0] === "Fête") {
        setSelectedOccasion("Tout");
        setSelectedParty(categoryName);
      }
    }
  }, [router]);

  // GET PRODUCTS ON FILTER CHANGE
  useEffect(async () => {
    await getProducts();
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

  return (
    <Layout
      pageTitle={`Cadeau pour ${currentCategory.name} - Mes cadeaux originaux`}
    >
      <div className="flex -mb-10">
        {/* FILTER */}
        <aside className="hidden md:block mb-5 pt-4 xl:pl-32 pr-1 lg:pl-5 xl:pl-32">
          <form className="xl:w-52">
            {currentCategory.name === "Nouveau" ||
            currentCategory.name === "Meilleurs cadeaux" ? null : (
              <ul
                onChange={(e) => {
                  setSelectedSortBy(e.target.value);
                }}
              >
                <label htmlFor="sort">
                  <h4>Classer par:</h4>
                </label>
                <select
                  id="sorts"
                  className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setSelectedSortBy(e.target.value);
                  }}
                  defaultValue=""
                >
                  <option value="">Nouveau</option>
                  <option>Meilleures ventes</option>
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
                  })}{" "}
                  <li className="flex-grow text-left pr-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="genre"
                        value="Tout"
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
                            <input
                              type="checkbox"
                              name="Type"
                              value={type.name}
                              defaultChecked
                            />
                            <label className="inline-flex items-center">
                              {type.name}
                            </label>
                          </li>
                        );
                      } else if (selectedGenre === "Tout") {
                        return (
                          <li key={index} className="flex-grow text-left pr-2">
                            <input
                              type="checkbox"
                              name="Type"
                              value={type.name}
                              defaultChecked
                            />
                            <label className="inline-flex items-center ml-2">
                              {type.name}
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
                      <input
                        type="checkbox"
                        name="prix"
                        value={price}
                        defaultChecked
                      />
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
                  className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
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

            {currentCategory.parent[0] === "Fête" ||
            currentCategory.parent[0] === "Occasion" ? null : (
              <div>
                <h4>Fête</h4>
                <select
                  id="fetes"
                  className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setSelectedParty(e.target.value);
                  }}
                  defaultValue=""
                >
                  {categories.Fête.map((party, index) => {
                    return <option key={index}>{party.name}</option>;
                  })}
                  <option value="">Tout</option>
                </select>
              </div>
            )}
          </form>
        </aside>
        <main className="mt-6 lg:px-5 xl:pr-20 border-2 border-transparent border-l-coolGray-100">
          <h1 className="text-4xl font-semibold">{`${currentCategory.name}`}</h1>
          <p className="my-5 text-justify">{currentCategory.description}</p>

          {/*PRODUCTS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 justify-between mb-10">
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
          {/* PAGINATION */}
          <Pagination
            numberOfProducts={filteredProducts.length}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            updateCurrentPage={onUpdateCurrentPage}
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

export async function getServerSideProps() {
  try {
    // GET CATEGORIES
    const dataCategories = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}categories/?ordered=true`
    );

    const categories = dataCategories.data;

    return {
      props: {
        categories
      }
    };
  } catch (e) {
    console.error(e);
  }
}
