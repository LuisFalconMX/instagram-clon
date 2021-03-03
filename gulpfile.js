
const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");

sass.compiler = require("node-sass");

gulp.task("compile:sass", () => {
  return gulp
    .src("./src/styles/index.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist"));
});

gulp.task('compile:pug', () => {
  return gulp
    .src('./src/pages/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("./dist"))
});