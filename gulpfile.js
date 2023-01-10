const { src, dest, watch, parallel } = require("gulp");
//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber'); //permite que los errores de SASS no terminen con la compilacion de CSS
const autoprefixer = require ('autoprefixer');
const cssnano = require ('cssnano');
const postcss = require ('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require ('gulp-avif');
//JavaScript
const terser = require('gulp-terser-js');
function css(done) {

    src('src/scss/**/*.scss')     // Identificar el archivo sass
        .pipe(sourcemaps.init())
        .pipe( plumber() )
        .pipe( sass() )         //Compilar el sass
        .pipe (postcss ([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        //Almacenarla en el disco duro
        .pipe( dest("build/css") ) //funcionan como "cañerias", una vez terminada la anterior empieza la siguiente

    done();
}
function imagenes(done) {
    const opciones = {
        optimizationLevel : 3
    }
    src('src/img/**/*.{png, jpg}' )
        .pipe( cache(imagemin(opciones)) )
        .pipe (dest('build/img'))
    done();
}
function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png, jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}
function versionAvif(done) {
    const opciones = {
        quality : 50
    }
    src('src/img/**/*.{png, jpg}' )
        .pipe( avif(imagemin(opciones)) )
        .pipe (dest('build/img'))
    done();
}
function javascript (done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}
function dev (done) {
    watch ('src/scss/**/*.scss', css);
    watch ('src/js/**/*.js', javascript);
    done();
}
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev);