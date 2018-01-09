var gulp = require('gulp'), 
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass'),
watch = require('gulp-watch'),
wait = require('gulp-wait'),
cssbeautify = require('gulp-cssbeautify');
browserSync = require('browser-sync').create();

//sass,prefix,uglify
gulp.task('sass', function () {
  return gulp.src('sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(wait(100))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))//sass
     .pipe(autoprefixer({
            browsers: ['last 2 versions'],//prefixer
            cascade: false
    }))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(gulp.dest('css'))
    .pipe(cssbeautify())
    .pipe(gulp.dest('css/beautified'));
});
 
 gulp.task('watch', function() {
    browserSync.init({
    notify: false,
    server: {
        baseDir: "."
    }
    });

//watch
    watch('**/*.html', function() {
            browserSync.reload();
        });

    watch('sass/**/*.scss', function() { 
            gulp.start('cssInject');
        });
 });

//inject
gulp.task('cssInject', ['sass'], function() {
    return gulp.src('css/main.css')
    .pipe(browserSync.stream());
});