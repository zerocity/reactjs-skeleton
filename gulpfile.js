var gulp = require("gulp"),
    browserify = require("gulp-browserify"),
    react = require('gulp-react'),
    stylus = require('gulp-stylus'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(watch())
        .pipe(gulp.dest('./build'))
        .pipe(livereload());
});

gulp.task('stylus', function () {
    gulp.src('./src/css/**/*.styl')
        .pipe(watch())
        .pipe(stylus())
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});

gulp.task('scripts', function () {
    gulp.src('./src/js/*.js')
        .pipe(watch())
        .pipe(react())
        .pipe(browserify({
              insertGlobals : false,
              transform: ["reactify"],
              debug: !gutil.env.production
          }))
        .pipe(gulp.dest('./build/js'))
        .pipe(livereload());
});

gulp.task("default", ['html','scripts','stylus']);
