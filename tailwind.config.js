/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    colors: {
      floral: "#FFF9EC",
      "dark-purple": "#0D0628",
      emerald: colors.emerald,
      teal: colors.teal,
    },
  },
  plugins: [],
};
