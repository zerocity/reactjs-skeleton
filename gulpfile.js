var gulp = require("gulp"),
    browserify = require("gulp-browserify"),
    react = require('gulp-react'),
    gulpif = require('gulp-if'),
    stylus = require('gulp-stylus'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

// Get and render all .styl files recursively
gulp.task('stylus', function () {
    gulp.src('./src/css/**/*.styl')
        .pipe(watch())
        .pipe(stylus())
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});

gulp.task('scripts', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(react())
        .pipe(browserify({
              insertGlobals : false,
              transform: ["reactify"],
              debug: !gutil.env.production
          }))
        .pipe(gulp.dest('./build/js'))
        .pipe(livereload());
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch('build/**').on('change', function(file) {
      server.changed(file.path);
  });

  gulp.watch('src/js/**/*.js', ['scripts']).on('change', function(file) {
      server.changed(file.path);
  });
});


gulp.task("default", ['scripts','stylus'],function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/js/**/*.jsx', ['scripts']);
    gulp.watch('src/css/*.styl', ['stylus']);
})
