/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        backdrop: "#262626",
        nav: "#171717",
        txt: "#ffffff",
        input: "#ffffff",
        inputTxt: "#000000",
        card: "#404040",
        progress: "#10b981",
        delete: "#dc2626",
        rename: "#15803d"
      }
    },
  },
  plugins: [],
}

