/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "coffee-s":
          "url('/public/preview.jpg')",
      },
      
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        'black-blue': 'rgba(0, 0, 0, 0.54)',
      },
    },
  },
  plugins: [],
};
