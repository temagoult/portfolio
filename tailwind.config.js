/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  
   "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {  screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1400px",
      xl: "1700px",
    },},
  },
  plugins: [],
}

