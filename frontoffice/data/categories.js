/**
 * Categories Showcase Data
 * Categories displayed on the homepage
 */

/**
 * List of featured categories to display on homepage
 * Each category has:
 * - name: Display name
 * - image: Path to the category image
 * - link: URL to the category page
 */
export const categoriesShowcase = [
  {
    name: 'Anniversaire',
    image: '/images/categories-showcase/ballons-anniversaire.jpg',
    link: '/category/Anniversaire'
  },
  {
    name: 'Romantique',
    image: '/images/categories-showcase/couple-s-embrasse.jpg',
    link: '/category/Romantique'
  },
  {
    name: 'Naissance',
    image: '/images/categories-showcase/bebe-yeux-bleus.jpg',
    link: '/category/B%C3%A9b%C3%A9'
  },
  {
    name: 'Mariage',
    image: '/images/categories-showcase/couple-mariage.jpg',
    link: '/category/Mariage'
  },
  {
    name: 'Remerciement',
    image: '/images/categories-showcase/carte-merci.jpg',
    link: '/category/Remerciements'
  },
  {
    name: 'Fun',
    image: '/images/categories-showcase/mamie-sombrero.jpg',
    link: '/category/Cadeau-rigolo'
  }
];

/**
 * Featured categories that appear in header and navigation
 */
export const featuredCategories = ['Nouveau', 'Meilleurs cadeaux'];

/**
 * Special category descriptions for dynamically generated pages
 */
export const specialCategoryDescriptions = {
  'Nouveau': {
    name: 'Nouveau',
    description:
      "Trouvez tous nos nouveaux cadeaux mis en ligne. Si vous cherchez un cadeau vraiment original alors n'hésitez pas à parcourir cette liste d'articles récents.",
    parent: ['']
  },
  'Meilleurs cadeaux': {
    name: 'Meilleurs cadeaux',
    description:
      'Retrouvez nos articles les plus vendus sur cette page. En choisissant parmi nos meilleurs cadeaux, vous vous assurez de faire plaisir à ceux qui les recevront!',
    parent: ['']
  }
};
