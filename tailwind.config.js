/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx, html}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
};
// Run this command after setting up the ./src/assets/tailwind.css and main.css
// npx tailwindcss -i ./src/assets/tailwind.css -o ./src/assets/main.css --watch
// Extedn functionality of tailwind - https://tailwind-elements.com/quick-start/
