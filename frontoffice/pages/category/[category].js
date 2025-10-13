/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { XMarkIcon as XIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import Pagination from '../../components/categories/Pagination';
import filterProducts from '../../components/categories/filterProducts';
import CheckboxRadio from '../../components/categories/CheckboxRadio';
import Select from '../../components/categories/Select.js';
import ProductsCard from '../../components/categories/ProductsCard';
import { specialCategoryDescriptions } from '../../data/categories';
import { priceSymbols } from '../../data/prices';
import { FILTER_TITLES, SORT_OPTIONS, PAGINATION, LABELS } from '../../constants';

/**
 * Category Page Component
 * Displays products filtered by category with various filter options
 * @param {Object} filters - Initial filter values
 * @param {Object} categories - All available categories
 * @param {Object} currentCategory - Current category being displayed
 */

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

  // Fetch products when filters change
  useEffect(() => {
    (async () => {
      try {
        // Get filtered products for current page
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

        // Get total count for pagination
        const maxProducts = await filterProducts(
          selectedGenre,
          prices,
          selectedType,
          selectedOccasion,
          selectedParty
        );

        setNumberOfProducts(maxProducts.numberOfProducts);
      } catch (e) {
        console.error('Error fetching filtered products:', e);
      }
    })();
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

  /**
   * Handle pagination page change
   */
  const onUpdateCurrentPage = (page) => {
    selectCurrentPage(Number(page));
  };

  /**
   * Generate page title based on category
   */
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
    <>
      <Head>
        <title>{pageTitle()}</title>
        <meta name="description" content={currentCategory.description} />
      </Head>
      <Layout>
      {/* Mobile Filters Close Button */}
      {mobileFiltersActive && (
        <XIcon
          className="absolute top-3 left-3 z-50 h-12 w-12 cursor-pointer"
          onClick={() => setMobileFiltersActive(false)}
        />
      )}

      {/* Page Header */}
      <div className="mx-1 lg:px-6 mt-6 text-center">
        <h1 className="text-4xl font-semibold lg:mx-64">{categoryName}</h1>
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
        {/* Filters Sidebar */}
        <aside className="px-1 sm:block lg:pb-5 lg:pt-4 lg:px-5 xl:px-10 lg:bg-coolGray-100">
          <div className="flex items-center justify-between lg:hidden mx-2">
            <p
              className="bg-coolGray-900 text-white py-2 px-4 cursor-pointer"
              onClick={() => setMobileFiltersActive(true)}
            >
              {LABELS.FILTERS}
            </p>

            <Pagination
              numberOfProducts={numberOfProducts}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              updateCurrentPage={onUpdateCurrentPage}
            />
          </div>

          {/* Filter Form */}
          <form
            className={`${
              mobileFiltersActive ? 'absolute' : 'hidden'
            } lg:static z-40 flex flex-col items-center w-full text-center lg:text-left lg-text lg:block xl:w-52 bg-coolGray-100 top-0 left-0 pt-5 h-full`}
          >
            {/* Sort By Filter (only for regular categories) */}
            {categoryName !== 'Nouveau' &&
            categoryName !== 'Meilleurs cadeaux' && (
              <ul>
                <label htmlFor="sorts">
                  <h4>{FILTER_TITLES.SORT_BY}</h4>
                </label>
                <select
                  id="sorts"
                  className="block w-full bg-white hover:border-coolGray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setSelectedSortBy(e.target.value);
                  }}
                  defaultValue={selectedSortBy}
                >
                  <option value={SORT_OPTIONS.NEW}>{SORT_OPTIONS.NEW}</option>
                  <option value={SORT_OPTIONS.BEST_SELLERS}>{SORT_OPTIONS.BEST_SELLERS}</option>
                </select>
              </ul>
            )}

            {/* Genre Filter */}
            {!currentCategory.parent.includes('Genre') && (
              <div>
                <h4>{FILTER_TITLES.GENRE}</h4>
                <ul onChange={(e) => setSelectedGenre(e.target.value)}>
                  {categories.Genre.map((genre, index) => (
                    <CheckboxRadio
                      key={index}
                      type="radio"
                      value={genre.name}
                      name="genre"
                    />
                  ))}
                  <CheckboxRadio
                    type="radio"
                    value=""
                    description={FILTER_TITLES.ALL}
                    name="genre"
                    checked
                  />
                </ul>
              </div>
            )}

            {/* Type Filter */}
            {!currentCategory.parent.includes('Type') &&
            selectedGenre !== 'Animal' && (
              <div>
                <h4>{FILTER_TITLES.TYPE}</h4>
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
            )}

            {/* Price Filter */}
            <h4>{FILTER_TITLES.PRICE}</h4>
            <ul>
              {priceSymbols.map((price, index) => (
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
              ))}
            </ul>
            {/* Occasion Filter */}
            {!selectedParty && !currentCategory.parent.includes('Occasion') && (
              <Select
                categoryName={FILTER_TITLES.OCCASION}
                category={categories.Occasion}
                changeCategoryHandler={(categoryName) => {
                  setSelectedOccasion(categoryName);
                }}
              />
            )}
            {/* Party Filter */}
            {!selectedOccasion && !currentCategory.parent.includes('Fête') && (
              <Select
                categoryName={FILTER_TITLES.PARTY}
                category={categories.Fête}
                changeCategoryHandler={(categoryName) => {
                  setSelectedParty(categoryName);
                }}
              />
            )}
          </form>
        </aside>

        {/* Products Grid */}
        {!mobileFiltersActive && (
          <div>
            <div className="px-1 mt-6 lg:mt-0 lg:px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-between mb-10">
              {filteredProducts.map((product, index) => (
                <ProductsCard
                  key={index}
                  cardNumber={index}
                  productId={product._id}
                  productName={product.name}
                  productPrice={product.price}
                  productImages={product.images}
                />
              ))}
            </div>
            {/* Bottom Pagination */}
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
        )}
      </div>
    </Layout>
    </>
  );
}

// PropTypes validation
Category.propTypes = {
  filters: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  currentCategory: PropTypes.object.isRequired
};

/**
 * Server-side data fetching for category page
 * Fetches category information and sets up initial filters
 */
export async function getServerSideProps({ query }) {
  try {
    const { category } = query;

    // Format category name from URL slug
    const formatedCategoryName =
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');

    let currentCategory = {};

    // Handle special categories (Nouveau, Meilleurs cadeaux)
    if (formatedCategoryName === 'Nouveau') {
      currentCategory = specialCategoryDescriptions['Nouveau'];
    } else if (formatedCategoryName === 'Meilleurs cadeaux') {
      currentCategory = specialCategoryDescriptions['Meilleurs cadeaux'];
    } else {
      // Fetch regular category from API
      const dataCurrentCategories = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/?name=${formatedCategoryName}`
      );

      currentCategory = dataCurrentCategories.data[0];
    }

    // Fetch all categories for filters
    const dataCategories = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/?ordered=true`
    );

    const categories = dataCategories.data;

    // Initialize default filters based on current category
    let sortBy =
      currentCategory.name === 'Meilleurs cadeaux'
        ? SORT_OPTIONS.BEST_SELLERS
        : SORT_OPTIONS.NEW;

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
      currentPage: PAGINATION.INITIAL_PAGE,
      productsPerPage: PAGINATION.PRODUCTS_PER_PAGE
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
    return { notFound: true };
  }
}
