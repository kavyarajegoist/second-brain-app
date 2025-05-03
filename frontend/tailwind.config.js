/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          100:'#e3e7fc',
          200: '#ccd2f9',
          300: '#aeb5f3',
          400: '#8d8fec',
          500: '#6962e0',
          600: '#6756d5',
          700: '#5846bc'
        }
      },
      fontFamily:{
        fav:['"DM Mono"','monospace'],
        sans:['"DM Sans"']
      }
    },
  },
  plugins: [],
}