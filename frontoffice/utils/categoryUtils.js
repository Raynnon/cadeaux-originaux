/**
 * Generate page title based on category name
 * @param {string} categoryName - Category name
 * @returns {string} Page title
 */
export const getPageTitle = (categoryName) => {
  if (categoryName === 'Nouveau') {
    return 'Nouveaux cadeaux - Mes cadeaux originaux';
  } else if (categoryName === 'Meilleurs cadeaux') {
    return 'Meilleurs cadeaux - Mes cadeaux originaux';
  } else {
    return `Cadeau pour ${categoryName} - Mes cadeaux originaux`;
  }
};
