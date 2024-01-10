/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      poppins: "'Poppins', sans-serif",
      roboto: "'Roboto',sans-serif",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
