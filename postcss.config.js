const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer'),
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}) // minimize production build size
    ],
};
