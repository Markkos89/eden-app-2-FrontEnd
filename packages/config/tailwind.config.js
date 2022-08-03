module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soilGreen: {
          50: "#E9F7CC",
          100: "#E1F4BA",
          200: "#D2EE97",
          300: "#C2E874",
          400: "#B3E251",
          500: "#A4DD2E",
          600: "#8DC220",
          700: "#6A9218",
          800: "#476210",
          900: "#243208",
        },
        soilBlue: {
          50: "#FFFFFF",
          100: "#F0F2FC",
          200: "#CDD6F7",
          300: "#AAB9F1",
          400: "#879DEB",
          500: "#6480E5",
          600: "#4164DF",
          700: "#2146C6",
          800: "#193596",
          900: "#112466",
        },
        soilOrange: {
          50: "#FFF9F3",
          100: "#FFEEDF",
          200: "#FFD9B6",
          300: "#FFC48D",
          400: "#FFAF65",
          500: "#FF993C",
          600: "#FF8413",
          700: "#DA6800",
          800: "#A24D00",
          900: "#6A3300",
        },
      },
    },
  },
  plugins: [],
};