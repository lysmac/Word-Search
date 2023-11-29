/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";
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
      white: colors.white,
      black: colors.black,
      red: colors.red,
    },
  },
  plugins: [],
};
