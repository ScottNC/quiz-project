/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      mobile: "640px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#0B2027",
      darkest: "#40798C",
      dark: "#70A9A1",
      light: "#CFD7C7",
      lightest: "#F6F1D1",
      wrong: "#AD1313",
      correct: "#24A31D",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],

      satisfy: ["Satisfy", "cursive"],
    },
  },
  plugins: [],
};
