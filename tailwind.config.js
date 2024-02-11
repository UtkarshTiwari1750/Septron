/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      poppins: ["Poppins", "sans-serif"],
      nanum: ["Nanum Brush Script", "cursive"],
      roboto: ["Roboto Slab", "serif"]
    },
    // colors: {
    //   "yellowNeon": "#FFFF33",
    // },
    extend: {
      backgroundColor:{
        "purpleNeon": "#BC13FE",
      },
      colors: {
        "yellowNeon": "#FFD60A"
      }
    },
  },
  plugins: [],
}