var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('server', function() {
  return gulp.src(['./server/**/*.js', '!./server/vendor/**/*.js', '!./server/**/*_test.js'])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', function() {
  gulp.watch("./server/**/*.js", ['server']);
});

gulp.task('build', ['server']);
