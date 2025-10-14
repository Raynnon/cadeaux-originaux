import { useState, useEffect } from 'react';
import filterProducts from '../components/categories/filterProducts';
import { priceSymbols } from '../data/prices';

/**
 * Custom hook to calculate available filter options based on existing products
 * @param {Object} categories - All available categories
 * @param {Object} currentCategory - Current category being displayed
 * @param {string} selectedGenre - Currently selected genre filter
 * @param {Array} prices - Currently selected price filters
 * @param {Array} selectedType - Currently selected type filters
 * @param {string} selectedOccasion - Currently selected occasion filter
 * @param {string} selectedParty - Currently selected party filter
 * @returns {Object} Available filter options
 */
export default function useAvailableFilters(
  categories,
  currentCategory,
  selectedGenre,
  prices,
  selectedType,
  selectedOccasion,
  selectedParty
) {
  const [availableFilters, setAvailableFilters] = useState({
    genres: [],
    types: [],
    occasions: [],
    parties: [],
    prices: []
  });

  useEffect(() => {
    const calculateAvailableFilters = async () => {
      try {
        const available = {
          genres: [],
          types: [],
          occasions: [],
          parties: [],
          prices: []
        };

        // Check each genre
        if (categories.Genre && !currentCategory.parent.includes('Genre')) {
          for (const genre of categories.Genre) {
            const count = await filterProducts(
              genre.name,
              prices,
              selectedType,
              selectedOccasion,
              selectedParty
            );
            if (count.numberOfProducts > 0) {
              available.genres.push(genre.name);
            }
          }
        }

        // Check each type
        if (categories.Type && !currentCategory.parent.includes('Type')) {
          for (const type of categories.Type) {
            const count = await filterProducts(
              selectedGenre,
              prices,
              [type.name],
              selectedOccasion,
              selectedParty
            );
            if (count.numberOfProducts > 0) {
              available.types.push(type.name);
            }
          }
        }

        // Check each occasion
        if (categories.Occasion && !currentCategory.parent.includes('Occasion')) {
          for (const occasion of categories.Occasion) {
            const count = await filterProducts(
              selectedGenre,
              prices,
              selectedType,
              occasion.name,
              selectedParty
            );
            if (count.numberOfProducts > 0) {
              available.occasions.push(occasion.name);
            }
          }
        }

        // Check each party
        if (categories.Fête && !currentCategory.parent.includes('Fête')) {
          for (const party of categories.Fête) {
            const count = await filterProducts(
              selectedGenre,
              prices,
              selectedType,
              selectedOccasion,
              party.name
            );
            if (count.numberOfProducts > 0) {
              available.parties.push(party.name);
            }
          }
        }

        // Check each price range
        for (const priceSymbol of priceSymbols) {
          const count = await filterProducts(
            selectedGenre,
            [priceSymbol],
            selectedType,
            selectedOccasion,
            selectedParty
          );
          if (count.numberOfProducts > 0) {
            available.prices.push(priceSymbol);
          }
        }

        setAvailableFilters(available);
      } catch (e) {
        console.error('Error calculating available filters:', e);
      }
    };

    calculateAvailableFilters();
  }, [categories, currentCategory, selectedGenre, prices, selectedType, selectedOccasion, selectedParty]);

  return availableFilters;
}
