var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


gulp.task('js', function() {
   gulp.src(['./public/js/yandex.js',
       './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-sanitize/angular-sanitize.min.js',
        './bower_components/angular-touch/angular-touch.js',
        './bower_components/angular-carousel/dist/angular-carousel.min.js',
        './bower_components/angular-resource/angular-resource.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-file-upload/dist/angular-file-upload.js',
        './bower_components/angular-paging/dist/paging.min.js',
        './bower_components/angular-cookies/angular-cookies.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './public/js/controllers/main.js',
        './public/js/controllers/*.js',
        '!./public/js/controllers/admin',
        './public/js/services/*.js',
        './public/js/app.js'
    ])
        .pipe(uglify({ mangle: false }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('css', function() {
    gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/angular-carousel/dist/angular-carousel.css',
        './public/css/app.css'
    ])
        .pipe(cleanCSS())
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('app', function() {
    gulp.run('js');
    gulp.run('css');
});