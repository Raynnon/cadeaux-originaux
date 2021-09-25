const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      orange: colors.orange,
      coolGray: colors.coolGray,
      white: colors.white
    }
  },
  variants: {
    extend: { visibility: ["group-hover"] }
  },
  plugins: []
};
