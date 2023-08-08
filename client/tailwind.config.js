/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
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
    },
  },
  plugins: [],
};
