/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import { XMarkIcon as XIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import Pagination from '../../components/categories/Pagination';
import ProductsCard from '../../components/categories/ProductsCard';
import FiltersSidebar from '../../components/categories/FiltersSidebar';
import { specialCategoryDescriptions } from '../../data/categories';
import { SORT_OPTIONS, PAGINATION, LABELS } from '../../constants';
import useAvailableFilters from '../../hooks/useAvailableFilters';
import useFilteredProducts from '../../hooks/useFilteredProducts';
import { getPageTitle } from '../../utils/categoryUtils';

/**
 * Category Page Component
 * Displays products filtered by category with various filter options
 * @param {Object} filters - Initial filter values
 * @param {Object} categories - All available categories
 * @param {Object} currentCategory - Current category being displayed
 */
export default function Category({ filters, categories, currentCategory }) {
  // UI State
  const [mobileFiltersActive, setMobileFiltersActive] = useState(false);
  const [currentPage, selectCurrentPage] = useState(filters.currentPage);

  // Filter States
  const [selectedSortBy, setSelectedSortBy] = useState(filters.sortBy);
  const [selectedGenre, setSelectedGenre] = useState(filters.selectedGenre);
  const [selectedType, setSelectedType] = useState(filters.selectedType);
  const [prices, setPrices] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState(filters.selectedOccasion);
  const [selectedParty, setSelectedParty] = useState(filters.selectedParty);

  const productsPerPage = filters.productsPerPage;
  const categoryName = filters.categoryName;

  // Custom Hooks
  const availableFilters = useAvailableFilters(
    categories,
    currentCategory,
    selectedGenre,
    prices,
    selectedType,
    selectedOccasion,
    selectedParty
  );

  const { filteredProducts, numberOfProducts } = useFilteredProducts(
    selectedGenre,
    prices,
    selectedType,
    selectedOccasion,
    selectedParty,
    selectedSortBy,
    currentPage,
    productsPerPage
  );

  /**
   * Handle pagination page change
   */
  const onUpdateCurrentPage = (page) => {
    selectCurrentPage(Number(page));
  };

  return (
    <>
      <Head>
        <title>{getPageTitle(categoryName)}</title>
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

            <FiltersSidebar
              categoryName={categoryName}
              currentCategory={currentCategory}
              categories={categories}
              availableFilters={availableFilters}
              selectedSortBy={selectedSortBy}
              setSelectedSortBy={setSelectedSortBy}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              prices={prices}
              setPrices={setPrices}
              selectedOccasion={selectedOccasion}
              setSelectedOccasion={setSelectedOccasion}
              selectedParty={selectedParty}
              setSelectedParty={setSelectedParty}
              mobileFiltersActive={mobileFiltersActive}
            />
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
