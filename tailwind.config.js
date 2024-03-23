/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  theme: {
    screens: {
      'sm': '768px'
    },
    extend: {},
  },
  plugins: [],
}

