/**
 * Price Ranges Data
 * Defines the price categories used throughout the application
 */

/**
 * Price range options with display names
 * - shortName: Symbol used in filters (€, €€, €€€)
 * - name: Full description of the price range
 */
export const priceRanges = [
  { shortName: '€', name: 'Pas cher' },
  { shortName: '€€', name: 'Bon rapport qualité prix' },
  { shortName: '€€€', name: 'Haut de gamme' }
];

/**
 * Price symbols used in product filtering
 */
export const priceSymbols = ['€', '€€', '€€€'];
