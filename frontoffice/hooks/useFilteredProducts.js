import { useState, useEffect } from 'react';
import filterProducts from '../components/categories/filterProducts';

/**
 * Custom hook to fetch and manage filtered products
 * @param {string} selectedGenre - Currently selected genre filter
 * @param {Array} prices - Currently selected price filters
 * @param {Array} selectedType - Currently selected type filters
 * @param {string} selectedOccasion - Currently selected occasion filter
 * @param {string} selectedParty - Currently selected party filter
 * @param {string} selectedSortBy - Sort option
 * @param {number} currentPage - Current page number
 * @param {number} productsPerPage - Products per page
 * @returns {Object} Filtered products and total count
 */
export default function useFilteredProducts(
  selectedGenre,
  prices,
  selectedType,
  selectedOccasion,
  selectedParty,
  selectedSortBy,
  currentPage,
  productsPerPage
) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
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
    };

    fetchProducts();
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

  return { filteredProducts, numberOfProducts };
}
