/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter, sans-serif",
      },
      backgroundImage: {
        "header-l": "url('/images/header-l.jpg')",
        "header-m": "url('/images/header-m.jpg')",
        "header-s": "url('/images/header-s.jpg')",
      },
      backgroundColor: {
        "main-dark": "#121212",
        "accent-dark": "#2E2E2F",
        accent: "#DFDDDD",
      },
      textColor: {
        "main-dark": "#121212",
        "accent-dark": "#2E2E2F",
        accent: "#DFDDDD",
        subtitles: "#111827",
        star: "#FEC654",
        desc: "#6B7280",
        "desc-dark": "#A5A5A5",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
