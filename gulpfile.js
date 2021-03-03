const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const babel = require('gulp-babel');

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
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist"))
});

gulp.task('compile:javascript', () => {
  return gulp
    .src('./src/javascript/**/*.js')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('./dist/'))
})