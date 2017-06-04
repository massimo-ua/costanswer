var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('run-dev', function(){
    browserSync.init({
        server: {
            baseDir: '.'
        },
        port: 7777
    });
});

gulp.task('default', ['run-dev']);