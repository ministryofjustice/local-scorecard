const mix = require('laravel-mix');

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

mix.copy('src/index.html', 'dist/index.html')
    .copy('node_modules/govuk-frontend/govuk/all.js', 'dist/assets/js/govuk.js')
    .copy('node_modules/govuk-frontend/govuk/assets/images', 'dist/assets/images')
    .copy('node_modules/govuk-frontend/govuk/assets/fonts', 'dist/assets/fonts')
    .sass('src/app.scss', 'dist/css');
