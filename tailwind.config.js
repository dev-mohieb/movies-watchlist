/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'inter': 'Inter, sans-serif'
      },
      backgroundImage: {
        'header-l': "url('/src/images/header-l.jpg')",
        'header-m': "url('/src/images/header-m.jpg')",
        'header-s': "url('/src/images/header-s.jpg')"
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}