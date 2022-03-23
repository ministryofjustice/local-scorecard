const mix_ = require('laravel-mix');

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

mix_.copy('src/index.html', 'dist/index.html')
    .copy('src/accessibility.html', 'dist/accessibility.html')
    .copy('src/judiciary-icon.png', 'dist/judiciary-icon.png')
    .copy('node_modules/govuk-frontend/govuk/assets/images', 'dist/assets/images')
    .copy('node_modules/govuk-frontend/govuk/assets/fonts', 'dist/assets/fonts')
    .sass('src/app.scss', 'dist/assets/css');
