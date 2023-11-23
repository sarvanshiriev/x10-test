const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

function pages() {
  return src('app/pages/*.html')
    .pipe(include({
      includePaths: 'app/components'
    }))
    .pipe(dest('.'))
    .pipe(browserSync.stream());
}

function fonts() {
  return src('app/fonts/src/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'));
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/main.js'], bundleJS);
  watch(['app/components/*', 'app/pages/*'], pages)
    .on('change', browserSync.reload);
  watch('app/*.html')
    .on('change', browserSync.reload);
}

function cleanDist() {
  return src('dist')
    .pipe(clean());
}

function building() {
  return src([
    'app/css/style.min.css',
    'app/images/*.*',
    '!app/images/*svg',
    '!app/images/stack',
    'app/images/sprite.svg',
    'app/fonts/*.*',
    'app/**/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'));
}

function bundleJS() {
  return src('app/js/**/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(dest('app/js'));
}

exports.styles = styles;
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, pages, watching, bundleJS);
