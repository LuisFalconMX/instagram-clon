const gulp = require("gulp");
const sass = require("gulp-sass");

sass.compiler = require("node-sass");

gulp.task("compile:sass", function () {
  return gulp
    .src("./src/styles/index.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist"));
});
