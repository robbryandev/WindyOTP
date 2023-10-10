/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.vue"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}

