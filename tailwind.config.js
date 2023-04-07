/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'inter': 'Inter, sans-serif'
      },
      backgroundImage: {
        'header-l': '/src/images/header-l.jpg',
        'header-m': '/src/images/header-m.jpg',
        'header-s': '/src/images/header-s.jpg'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}