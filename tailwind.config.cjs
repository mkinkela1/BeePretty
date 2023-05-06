/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#ffcc00",
      white: "#fff",
      gray: {
        100: "#efefef",
        900: "#222"
      },
      red: "#f00"
    }
  },
  plugins: [
    "@tailwindcss/typography",
    "@tailwindcss/forms",
  ],
}