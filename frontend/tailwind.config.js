/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        netflix: {
          black: '#141414',
          red: '#E50914',
          gray: '#808080'
        }
      }
    },
  },
  plugins: [],
}
