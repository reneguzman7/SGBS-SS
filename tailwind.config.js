/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind')

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [addDynamicIconSelectors()],
}