/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind')

module.exports = {
  content: [
    "./public/html/**/*.html",
    "./public/js/**/*.js",
    "./public/css/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        'color_header': '#0d9488',
        'secondary': '#00FF00',
        'tertiary': '#0000FF',
      },
    },
  },
  plugins: [addDynamicIconSelectors()]
}



