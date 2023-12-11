/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greyHeader: '#707070',
        greyBody: '#F4F4F6',
        redText: '#E73333',
      },
    },
  },
  plugins: [],
}

