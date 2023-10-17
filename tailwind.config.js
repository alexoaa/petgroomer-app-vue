/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 1.2s linear infinite",
      },
    },
    fontFamily: {
      "encoded-sans": ["Encode Sans Condensed", "sans-serif"],
    },
  },
  plugins: [],
};
