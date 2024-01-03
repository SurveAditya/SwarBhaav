/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: "#F0F0F0",
        navy: "#213555",
        seablue: "#4F709C",
        gold: "#E5D283"
      }
    },
  },
  plugins: [],
}
