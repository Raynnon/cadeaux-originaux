/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from "../../components/Layout";
import Pagination from "../../components/subcomponents/Pagination";
import GenreMenu from "../../components/subcomponents/categories/GenreMenu";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import slugify from "slugify";
import { useRouter } from "next/router";

import filterProducts from "../../components/subcomponents/filterProducts";

export default function Category({ categories }) {
  const [categoryName, setCategoryName] = useState("category");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSortBy, setSelectSortBy] = useState("Nouveau");
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

  useEffect(async () => {
    // ASSIGN THE PAGE NAME
    const { category } = router.query;

    const formatedCategoryName =
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");

    setCategoryName(formatedCategoryName);
  }, [router]);

  useEffect(() => {
    const typeObj = {};

    categories.Type.forEach((item) => {
      typeObj[item.name] = true;
    });

    setSelectedType(typeObj);
  }, [selectedGenre]);

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
    <Layout pageTitle={`Cadeau pour ${categoryName} - Mes cadeaux originaux`}>
      <div className="flex -mb-10">
        {/* FILTER */}
        <aside className="hidden md:block w-96 mb-5">
          <div className="lg:px-32">
            <h3 className="py-5 text-2xl font-semibold">Filtres</h3>
          </div>
          <form className="lg:pr-5 lg:pl-32 border-2 border-transparent border-t-coolGray-100 pt-4">
            <ul onChange={(e) => setSelectSortBy(e.target.value)}>
              <label htmlFor="sort">
                <h4>Classer par:</h4>
              </label>
              <select
                id="sorts"
                className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setSelectSortBy(e.target.value);
                }}
              >
                <option selected>Nouveau</option>
                <option>Meilleures ventes</option>
              </select>
            </ul>
            <h4>Genre</h4>
            <GenreMenu categories={categories} />
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

            <label htmlFor="occasion">
              <h4>Occasion</h4>
            </label>
            <select
              id="occasion"
              className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setSelectedOccasion(e.target.value);
              }}
            >
              {categories.Occasion.map((occasion, index) => {
                return <option key={index}>{occasion.name}</option>;
              })}
              <option selected>Tout</option>
            </select>

            <label htmlFor="occasion">
              <h4>Fête</h4>
            </label>
            <select
              id="fetes"
              className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setSelectedParty(e.target.value);
              }}
            >
              {categories.Fête.map((party, index) => {
                return <option key={index}>{party.name}</option>;
              })}
              <option selected>Tout</option>
            </select>
          </form>
        </aside>
        <main className="xl:px-20 border-2 border-transparent border-l-coolGray-100">
          <h1 className="mx-1 xl:mx-0 mt-10 text-4xl font-semibold">{`${categoryName}`}</h1>
          <p className="mx-1 xl:mx-0 my-5 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            in fringilla libero, eget gravida sem. Integer viverra a nulla nec
            ultrices. Donec volutpat ligula et sagittis iaculis. Pellentesque
            vitae elit consequat, hendrerit risus eu, congue sapien. Sed
            pharetra vitae diam ut feugiat. In euismod velit at mi facilisis, in
            commodo velit vestibulum. Duis feugiat enim in luctus dapibus. Morbi
            sit amet mi non ante bibendum consequat nec id felis. Curabitur at
            placerat tellus, ut auctor sem. Nullam nec purus turpis. Sed
            elementum risus sem, nec egestas erat pellentesque vitae.
          </p>

          {/* PAGINATION */}
          <Pagination
            numberOfProducts={filteredProducts.length}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            updateCurrentPage={onUpdateCurrentPage}
          />

          {/*PRODUCTS */}
          <div className="flex flex-wrap justify-between mb-10">
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
                      <a className="xl:w-1/4">
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

                          <h2 className="text-xl font-semibold text-center mt-3">
                            {product.name}
                          </h2>
                          <div className="flex justify-around items-center mt-3">
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

export async function getServerSideProps({ req }) {
  try {
    // GET CATEGORIES
    const dataCategories = await axios.get(
      "http://localhost:4000/categories/?ordered=true"
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
