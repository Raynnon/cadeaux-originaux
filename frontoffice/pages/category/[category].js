/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from '../../components/Layout';
import Pagination from '../../components/categories/Pagination';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';

import filterProducts from '../../components/categories/filterProducts';
import CheckboxRadio from '../../components/categories/CheckboxRadio';
import Select from '../../components/categories/Select.js';
import ProductsCard from '../../components/categories/ProductsCard';

export default function Category({ filters, categories, currentCategory }) {
  const [mobileFiltersActive, setMobileFiltersActive] = useState(false);
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

    console.log('Test', currentCategory);

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
    if (categoryName === 'Nouveau') {
      return 'Nouveaux cadeaux - Mes cadeaux originaux';
    } else if (categoryName === 'Meilleurs cadeaux') {
      return 'Meilleurs cadeaux - Mes cadeaux originaux';
    } else {
      return `Cadeau pour ${categoryName} - Mes cadeaux originaux`;
    }
  };

  return (
    <Layout pageTitle={pageTitle()} description={currentCategory.description}>
      {mobileFiltersActive ? (
        <XIcon
          className="absolute top-3 left-3 z-50 h-12 w-12 cursor-pointer"
          onClick={() => setMobileFiltersActive(false)}
        />
      ) : null}

      <div className="mx-1 lg:px-6 mt-6 text-center">
        <h1 className="text-4xl font-semibold lg:mx-64">{`${categoryName}`}</h1>
        <p className="my-5 text-center lg:mx-64">
          {currentCategory.description}
        </p>
        <div className="hidden lg:block pb-6">
          <Pagination
            numberOfProducts={numberOfProducts}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            updateCurrentPage={onUpdateCurrentPage}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row -mb-10">
        {/* FILTERS */}
        <aside className="px-1 sm:block lg:pb-5 lg:pt-4 lg:px-5 xl:px-10 lg:bg-coolGray-100">
          <div className="flex items-center justify-between lg:hidden mx-2">
            <p
              className="bg-coolGray-900 text-white py-2 px-4"
              onClick={() => setMobileFiltersActive(true)}
            >
              Filters
            </p>

            <Pagination
              numberOfProducts={numberOfProducts}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              updateCurrentPage={onUpdateCurrentPage}
            />
          </div>

          <form
            className={`${
              mobileFiltersActive ? 'absolute' : 'hidden'
            } lg:static z-40 flex flex-col items-center w-full text-center lg:text-left lg-text lg:block xl:w-52 bg-coolGray-100 top-0 left-0 pt-5 h-full`}
          >
            {categoryName === 'Nouveau' ||
            categoryName === 'Meilleurs cadeaux' ? null : (
              <>
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
              </>
            )}

            {currentCategory.parent.includes('Genre') ? null : (
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
                    description={'Tout'}
                    name="genre"
                    checked
                  />
                </ul>
              </div>
            )}

            {!currentCategory.parent.includes('Type') &&
            selectedGenre !== 'Animal' ? (
              <div>
                <h4>Type</h4>
                <ul>
                  {categories.Type.filter(
                    (type) =>
                      type.parent.includes(selectedGenre) ||
                      currentCategory !== 'Nouveau' ||
                      currentCategory !== 'Meilleurs cadeaux'
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
              {['€', '€€', '€€€'].map((price, index) => {
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
            {!selectedParty && !currentCategory.parent.includes('Occasion') ? (
              <Select
                categoryName="Occasion"
                category={categories.Occasion}
                changeCategoryHandler={(categoryName) => {
                  setSelectedOccasion(categoryName);
                }}
              />
            ) : null}
            {!selectedOccasion && !currentCategory.parent.includes('Fête') ? (
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

        {/*PRODUCTS */}
        {!mobileFiltersActive ? (
          <div>
            <div className="px-1 mt-6 lg:mt-0 lg:px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-between mb-10">
              {filteredProducts.map((product, index) => {
                console.log('product', product);
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
            <div className="px-2 lg:mt-0 lg:px-5 pb-6">
              <Pagination
                numberOfProducts={numberOfProducts}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                updateCurrentPage={onUpdateCurrentPage}
                details={true}
              />
            </div>
          </div>
        ) : null}
      </div>

      <style global jsx>{`
        h4 {
          margin-top: 10px;
          margin-bottom: 5px;
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
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');

    let currentCategory = {};

    if (formatedCategoryName === 'Nouveau') {
      currentCategory = {
        name: formatedCategoryName,
        description:
          "Trouvez tous nos nouveaux cadeaux mis en ligne. Si vous cherchez un cadeau vraiment original alors n'hésitez pas à parcourir cette liste d'articles récents.",
        parent: ['']
      };
    } else if (formatedCategoryName === 'Meilleurs cadeaux') {
      currentCategory = {
        name: formatedCategoryName,
        description:
          'Retrouvez nos articles les plus vendus sur cette page. En choisissant parmi nos meilleurs cadeaux, vous vous assurez de faire plaisir à ceux qui les recevront!',
        parent: ['']
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
      currentCategory.name === 'Meilleurs cadeaux'
        ? 'Meilleures ventes'
        : 'Nouveau';

    let selectedGenre = currentCategory.parent.includes('Genre')
      ? currentCategory.name
      : '';

    let selectedOccasion = currentCategory.parent.includes('Occasion')
      ? currentCategory.name
      : '';

    let selectedParty = currentCategory.parent.includes('Fête')
      ? currentCategory.name
      : '';

    const selectedType = currentCategory.parent.includes('Type')
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
      productsPerPage: 24
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
