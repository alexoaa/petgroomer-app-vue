/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      "encoded-sans": ["Encode Sans Condensed", "sans-serif"],
    },
  },
  plugins: [],
};
