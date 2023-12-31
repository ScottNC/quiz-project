/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/index.html", "./client/src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#0B2027",
      darkest: "#40798C",
      dark: "#70A9A1",
      light: "#CFD7C7",
      lightest: "#F6F1D1",
      wrong: "#F35B04",
      correct: "#61E786",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      satisfy: ["Satisfy", "cursive"],
    },
  },
  plugins: [],
};
