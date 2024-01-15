const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./index.html",
        "./resources/js/**/*.{vue,js,ts,jsx,tsx}",
        "./resources/**/*.js",
        "./node_modules/flowbite/**/*.js",
        'public/js/*.js',
        'public/js/module/view/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                'sans': ['Roboto', 'sans-serif']
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('flowbite/plugin')
    ],
};
