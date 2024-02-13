/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      poppins: ["Poppins", "sans-serif"],
      nanum: ["Nanum Brush Script", "cursive"],
      roboto: ["Roboto Slab", "serif"],
      raleway: ["Raleway", "sans-serif"]
    },
    extend: {
      backgroundColor:{
        "purpleNeon": "#BC13FE",
      },
      colors: {
        "yellowNeon": "#FFD60A"
      },
      animation: {
        tilt: 'tilt 10s infinite linear'
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100" : {
            transform: "scale(1)",
            opacity: "0.75"
          } ,
          "25%" : {
            transform: 'scale(1.05)',
            opacity: "0.85"
          },
          "75%":{
            transform: "scale(1.02)",
            opacity: "1"
          },

        }
      }
    },
  },
  plugins: [],
}