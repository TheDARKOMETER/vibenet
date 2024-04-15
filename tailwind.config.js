/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  theme: {
    screens: {
      'sm': '1024px'
    },
    extend: {},
  },
  plugins: [],
}

