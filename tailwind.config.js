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
    extend: {
      backgroundColor:{
        "purpleNeon": "#BC13FE"
      },
      
    },
  },
  plugins: [],
}