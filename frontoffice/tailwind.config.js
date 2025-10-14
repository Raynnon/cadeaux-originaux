const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: colors.white,
      black: colors.black,

      // Modern Teal & Coral Palette 2025
      primary: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',  // Main teal - buttons, accents
        500: '#14b8a6',  // Darker teal - hover states
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
      },
      secondary: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',  // Coral - warm accents, highlights
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
      neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },

      // Legacy support (mapped to new colors)
      coolGray: colors.gray,
      orange: {
        400: '#2dd4bf',  // Map to primary-400
        500: '#14b8a6',  // Map to primary-500
        600: '#0d9488',  // Map to primary-600
      }
    }
  },
  variants: {
    extend: { visibility: ['group-hover'], display: ['group-hover'] }
  },
  plugins: []
};
