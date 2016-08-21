var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var path = require('path');

gulp.task('style', function () {
    var lessStream = gulp.src('./src/assets/style/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('less-files.less'));

    var cssStream = gulp.src('./src/assets/style/*.css')
        .pipe(concat('css-files.css'));

    var mergedStream = merge(lessStream, cssStream)
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('./build/assets/style/'));

    return mergedStream;
});

gulp.task('copy-index-html', function() {
    gulp.src('./src/index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('copy-images', function() {
    gulp.src('./src/assets/img/*')
    .pipe(gulp.dest('./build/assets/img/'));
});

gulp.task('copy-fonts', function() {
    gulp.src('./src/assets/fonts/*')
    .pipe(gulp.dest('./build/assets/fonts/'));
});

gulp.task('copy-scripts', function() {
    gulp.src(['./node_modules/jquery/dist/jquery.min.js', './src/assets/js/*'])
    .pipe(gulp.dest('./build/assets/js/'));
});

gulp.task('build', ['copy-index-html', 'style', 'copy-images', 'copy-scripts', 'copy-fonts']);

gulp.task('watch', function () {
    gulp.watch('./src/assets/style/*.less', ['style']);
    gulp.watch('./src/assets/style/*.css', ['style']);
    gulp.watch('./src/index.html', ['copy-index-html']);
    gulp.watch('./src/assets/img/*', ['copy-images']);
    gulp.watch('./src/assets/js/*', ['copy-scripts']);
});
