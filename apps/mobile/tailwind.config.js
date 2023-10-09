/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        backdrop: "#262626",
        nav: "#171717",
        txt: "#ffffff",
        card: "#525252",
        progress: "#10b981"
      }
    },
  },
  plugins: [],
}

