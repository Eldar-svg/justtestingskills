/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "coffee-s":
          "url('https://www.shutterstock.com/image-vector/brown-repeated-beans-coffee-pattern-600nw-2395113073.jpg')",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      }
    },
  },
  plugins: [],
};
