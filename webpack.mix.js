const mix = require('laravel-mix');
const Dotenv = require('dotenv-webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

module.exports = {
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['vue-loader', 'vue-svg-loader'],
            }
        ],
        plugins: [
            new Dotenv(),
        ]
    },
};

mix.js('resources/js/app.js', 'public/js')
    .extract()
    .vue({ version: 3 })
    .postCss('resources/css/app.css', 'public/css', [
        // require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ]).version();
