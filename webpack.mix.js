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

mix.sass('app.scss', 'assets/css')
    .copy('node_modules/govuk-frontend/govuk/all.js', 'assets/js/govuk.js')
    .copy('node_modules/govuk-frontend/govuk/assets/images', 'assets/images')
    .copy('node_modules/govuk-frontend/govuk/assets/fonts', 'assets/fonts');
