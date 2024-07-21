/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind')

module.exports = {
  content: [
    "./public/html/**/*.html",
    "./public/js/**/*.js",
    "./public/css/**/*.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [addDynamicIconSelectors()]
}



