/**
 * Application Constants
 * Centralizes all reusable texts, values, and configurations
 */

// Navigation and page sections
export const SECTIONS = {
  HEADER: 'header',
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  FOOTER: 'footer'
};

// Button and link labels
export const LABELS = {
  BUY: 'Acheter',
  DISCOVER: 'Découvrir',
  FILTERS: 'Filters',
  NEW: 'NOUVEAU',
  POPULAR: 'POPULAIRE'
};

// Category names (reusable constants)
export const CATEGORY_NAMES = {
  NEW: 'Nouveau',
  BEST_GIFTS: 'Meilleurs cadeaux',
  BIRTHDAY: 'Anniversaire'
};

// Sort options
export const SORT_OPTIONS = {
  NEW: 'Nouveau',
  BEST_SELLERS: 'Meilleures ventes'
};

// Filter section titles
export const FILTER_TITLES = {
  SORT_BY: 'Classer par:',
  GENRE: 'Genre',
  TYPE: 'Type',
  PRICE: 'Prix',
  OCCASION: 'Occasion',
  PARTY: 'Fête',
  ALL: 'Tout'
};

// Product suggestions section titles
export const SECTION_TITLES = {
  NEW_PRODUCTS: 'Nouveaux produits',
  BEST_PRODUCTS: 'Meilleurs produits',
  BIRTHDAY_GIFTS: 'Nos meilleurs cadeaux d\'anniversaire'
};

// Pagination
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 24,
  INITIAL_PAGE: 1
};

// Image dimensions and quality
export const IMAGE_CONFIG = {
  QUALITY: {
    HIGH: 100,
    MEDIUM: 50
  },
  SIZES: {
    THUMBNAIL: 140,
    SMALL: 150,
    MEDIUM: 600,
    LARGE: 580
  }
};

// Alternative texts for accessibility
export const ALT_TEXT = {
  LOGO: 'Mes cadeaux originaux logo',
  GIFT_ICON: 'icone-cadeau',
  MAGNIFYING_GLASS: 'magnifying-glass',
  BIRTHDAY_CAKE: 'gateau-anniversaire'
};

// Color values (for occasional inline styles that can't use Tailwind)
export const COLORS = {
  TEXT_DARK: '#1F2937',
  ORANGE_PRIMARY: '#FB923C',
  GRAY_BG: '#F3F4F6'
};
