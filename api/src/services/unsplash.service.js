/**
 * Image Service
 * Generates relevant image URLs from Pexels based on product names
 */

/**
 * Mapping of product keywords to Pexels image IDs
 * Images are free to use from Pexels
 */
const IMAGE_MAPPING = {
  // Tech & Gadgets
  'montre': 393047,      // smartwatch
  'smartwatch': 393047,
  'watch': 393047,
  'drone': 2876511,      // drone with camera
  'casque': 3945683,     // gaming headset
  'headset': 3945683,
  'gaming': 3945683,
  'enceinte': 1279813,   // bluetooth speaker
  'speaker': 1279813,
  'bluetooth': 1279813,
  'projecteur': 2608517, // projector
  'projector': 2608517,
  'lampe': 1112598,      // lamp
  'lamp': 1112598,
  'lune': 1257860,       // moon lamp
  'climatiseur': 5217865, // air conditioner
  'trottinette': 7641728, // electric scooter
  'scooter': 7641728,
  'chargeur': 1476321,   // charger
  'support': 1092644,    // phone holder

  // Kitchen & Home
  'couteau': 4198018,    // kitchen knives
  'couteaux': 4198018,
  'knife': 4198018,
  'knives': 4198018,
  'cafetière': 324028,   // coffee maker
  'coffee': 324028,
  'barista': 324028,
  'blender': 6823561,    // blender
  'mixeur': 6823561,
  'bouilloire': 6032889, // kettle
  'kettle': 6032889,
  'raclette': 1435904,   // raclette
  'plancha': 1435904,    // grill
  'balance': 6544324,    // kitchen scale
  'carafe': 1188434,     // carafe
  'pierre': 1435904,     // pizza stone

  // Food & Drinks
  'whisky': 602750,      // whisky bottles
  'whiskey': 602750,
  'vin': 1188434,        // wine
  'wine': 1188434,
  'thé': 1638280,        // tea set
  'tea': 1638280,
  'chocolat': 918327,    // chocolate
  'chocolate': 918327,

  // Fashion & Accessories
  'sac': 1152077,        // bag
  'bag': 1152077,
  'portefeuille': 5650026, // wallet
  'wallet': 5650026,
  'ceinture': 1124468,   // belt
  'belt': 1124468,
  'montre': 190819,      // watch

  // Art & Hobbies
  'peinture': 1053687,   // painting
  'painting': 1053687,
  'puzzle': 5428836,     // puzzle
  'livre': 159581,       // book
  'book': 159581,
  'appareil': 243757,    // camera
  'camera': 243757,
  'photo': 243757,
  'calligraphie': 261763, // calligraphy
  'origami': 1762851,    // origami paper
  'telescope': 2034892,  // telescope
  'microscope': 2280571, // microscope
  'jumelles': 6899261,   // binoculars

  // Sports & Fitness
  'yoga': 3822906,       // yoga mat
  'tapis': 3822906,
  'fitness': 416778,     // fitness equipment
  'vélo': 100582,        // bicycle
  'bicycle': 100582,
  'bike': 100582,
  'gourde': 1187317,     // water bottle
  'hamac': 1268101,      // hammock

  // Beauty & Wellness
  'parfum': 965989,      // perfume
  'perfume': 965989,
  'soin': 3738332,       // skincare
  'skincare': 3738332,
  'maquillage': 2113855, // makeup
  'makeup': 2113855,
  'spa': 3184405,        // spa products
  'massage': 3757957,    // massage
  'coussin': 1350789,    // cushion/pillow
  'plaid': 276583,       // blanket

  // Home & Decoration
  'horloge': 1452717,    // clock
  'trousse': 1152077,    // toiletry bag
  'valise': 1008155,     // suitcase
  'tablier': 1640777,    // apron
  'machine': 1435904,    // machine
  'popcorn': 33129,      // popcorn
  'jardinage': 1301856,  // gardening
  'plante': 1301856,

  // Drinks & Kits
  'biere': 1089932,      // beer
  'rhum': 602750,        // rum
  'gin': 602750,         // gin
  'cocktail': 1089932,   // cocktail set
  'fromage': 821365,     // cheese

  // Default images for common categories
  'default': 264636      // gift box
};

/**
 * Extract relevant keywords from product name
 * @param {string} productName - The product name
 * @returns {string} - First relevant keyword
 */
const extractKeywords = (productName) => {
  const words = productName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .split(/[\s-]+/)
    .filter(word => word.length > 3);

  return words[0] || 'default';
};

/**
 * Find matching Pexels image ID for a product
 * @param {string} productName - The product name
 * @returns {number} - Pexels image ID
 */
const findImageId = (productName) => {
  const normalized = productName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove accents

  // Find all matching keywords and their lengths
  const matches = [];
  for (const [keyword, imageId] of Object.entries(IMAGE_MAPPING)) {
    if (keyword !== 'default' && normalized.includes(keyword)) {
      matches.push({ keyword, imageId, length: keyword.length });
    }
  }

  // If matches found, return the one with the longest keyword (most specific)
  if (matches.length > 0) {
    matches.sort((a, b) => b.length - a.length);
    return matches[0].imageId;
  }

  // Return default if no match found
  return IMAGE_MAPPING.default;
};

/**
 * Generate image URLs for a product using Pexels
 * @param {object} product - Product object with name
 * @param {number} count - Number of images to generate (1-3)
 * @returns {array} - Array of image URLs
 */
const generateUnsplashImages = (product, count = 1) => {
  const images = [];
  const imageId = findImageId(product.name);

  // Use Pexels direct image URLs (free to use, no API key required)
  // Format: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400
  for (let i = 0; i < count; i++) {
    // For multiple images, we can use slight variations in cropping
    const url = `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1`;
    images.push(url);
  }

  return images;
};

/**
 * Add Unsplash images to products array
 * @param {array} products - Array of products
 * @param {number} imagesPerProduct - Number of images per product
 * @returns {array} - Products with image URLs
 */
const addUnsplashImages = (products, imagesPerProduct = 1) => {
  return products.map(product => ({
    ...product,
    images: generateUnsplashImages(product, imagesPerProduct)
  }));
};

module.exports = {
  extractKeywords,
  generateUnsplashImages,
  addUnsplashImages
};
