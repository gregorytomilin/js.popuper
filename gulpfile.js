// .pipe(rename({suffix: ".min"}))
'use strict';
const { src, dest, task } = require("gulp");
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const removeComments = require ('gulp-strip-css-comments');

const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');



task('scss', () => {
  return src(['src/scss/popuper.scss']) // берём главный css
      .pipe(sass({
          outputStyle: 'expanded',  // вложенный (по умoлчанию)
      }).on('error', sass.logError))
      .pipe(sourcemaps.init())
      .pipe(removeComments())
      .pipe(dest('dist/css'))
      .pipe(cleanCSS())
      .pipe(rename({suffix: ".min"}))
      // выгружаем результат
      .pipe(dest('dist/css'));
});

task("js", function() {
    return src('src/js/popuper.js')
      .pipe(dest("dist/js"))
      .pipe(rename({suffix: ".min"}))
      .pipe(uglify())
      .pipe(dest("dist/js"));
});