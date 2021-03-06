const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser')
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const clean = require('gulp-clean');

gulp.task('compile:less', () => {
  return gulp
    .src('./src/styles/index.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'))
});

gulp.task('compile:pug', () => {
  return gulp
    .src('./src/views/pages/**/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('compile:js', () => {
  return gulp
    .src('./src/javascript/**/*.js')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('optimize:css', () => {
  return gulp
    .src('./dist/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('optimize:html', () => {
  return gulp
    .src('./dist/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('optimize:js', () => {
  return gulp
    .src('./dist/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('./dist/'))
})

gulp.task('create:dist', () => {
  return gulp
    .src('./')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('clean:dist', () => {
  return gulp
    .src('./dist/')
    .pipe(clean())
})

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });

  gulp.watch('./src/styles/**/*.less', gulp.series(['compile:less'])).on('change', reload);
  gulp.watch('./src/views/**/*.pug', gulp.series(['compile:pug'])).on('change', reload);
  gulp.watch('./src/javascript/**/*.js', gulp.series(['compile:js'])).on('change', reload);
});

gulp.task('dev', gulp.series(['create:dist', 'clean:dist', 'compile:less', 'compile:pug', 'compile:js', 'server']));
gulp.task('build', gulp.series(['clean:dist', 'compile:less', 'compile:pug', 'compile:js', 'optimize:css', 'optimize:html', 'optimize:js']));