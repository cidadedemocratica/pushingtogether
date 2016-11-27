"use strict"

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jslint = require('gulp-jslint');


var paths = { 
  js : ['app.js', 'src/**/*.js', 'config/*.js']
}

// process JS files and return the stream.
gulp.task('js', () => {
    return gulp.src(paths.js)
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], (done) => {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], () => {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(paths.js, ['js-watch']);
});
 
gulp.task('default', () => {
    return gulp.src(['source.js'])
            .pipe(jslint({ /* this object represents the JSLint directives being passed down */ }))
            .pipe(jslint.reporter( 'my-reporter' ));
});
