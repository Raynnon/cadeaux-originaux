const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      orange: colors.orange,
      coolGray: colors.gray,
      white: colors.white
    }
  },
  variants: {
    extend: { visibility: ["group-hover"], display: ["group-hover"] }
  },
  plugins: []
};
