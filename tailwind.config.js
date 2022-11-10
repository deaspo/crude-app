/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

// Run this command after setting up the ./src/assets/tailwind.css and main.css
// npx tailwindcss -i ./src/assets/tailwind.css -o ./src/assets/main.css --watch
