const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

sass.compiler = require('node-sass');

gulp.task('compile:sass', () => {
  return gulp
    .src('./src/styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
});

gulp.task('compile:pug', () => {
  return gulp
    .src('./src/pages/**/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('compile:javascript', () => {
  return gulp
    .src('./src/javascript/**/*.js')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });

  gulp.watch('./src/styles/**/*.scss', gulp.series(['compile:sass'])).on('change', reload);
  gulp.watch('./src/pages/**/*.pug', gulp.series(['compile:pug'])).on('change', reload);
  gulp.watch('./src/javascript/**/*.js', gulp.series(['compile:javascript'])).on('change', reload);
});

gulp.task('optimize:css', () => {
  return gulp
    .src('./dist/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('dev', gulp.series(['compile:sass', 'compile:pug', 'compile:javascript', 'server']));