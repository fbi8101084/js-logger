var gulp = require('gulp');

var gutil  = require('gulp-util');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');

var paths = {
    js: ['js/**/*.js'],
    css: ['css/**/*.css']
};

gulp.task('biuld:css', function () {
    gulp.src(paths.css)
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('biuld:js', function() {
    gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('all.src.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.start('biuld:css', 'biuld:js');
    gulp.watch(paths.css[0], ['biuld:css']);
    gulp.watch(paths.js[0], ['biuld:js']);
});

gulp.task('default', function() {
    gulp.start('biuld:css', 'biuld:js');
});