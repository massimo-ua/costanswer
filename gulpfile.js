var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

    //script paths
    var jsFiles = [
      'main/app/js/*.js',
      'main/app/js/controllers/*.js',
      'main/app/js/services/*.js'
    ],
        jsDest = 'main/app/dist/js';

    gulp.task('scripts', function() {
        return gulp.src(jsFiles)
            .pipe(concat('bundle.js'))
            .pipe(rename('bundle.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(jsDest));
    });

/*gulp.task('run-dev', function(){
    browserSync.init({
        server: {
            baseDir: '.'
        },
        port: 7777
    });
});*/

gulp.task('default', ['scripts']);
