var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./src/assets/style/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./build/assets/style/'));
});

gulp.task('copy-index-html', function() {
    gulp.src('./src/index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('copy-images', function() {
    gulp.src('./src/assets/img/*')
    .pipe(gulp.dest('./build/assets/img/'));
});

gulp.task('copy-scripts', function() {
    gulp.src('./src/assets/js/*')
    .pipe(gulp.dest('./build/assets/js/'));
});

gulp.task('build', ['copy-index-html', 'less', 'copy-images', 'copy-scripts']);

gulp.task('watch', function () {
    gulp.watch('./src/assets/style/*.less', ['less']);
    gulp.watch('./src/index.html', ['copy-index-html']);
    gulp.watch('./src/assets/img/*', ['copy-images']);
    gulp.watch('./src/assets/js/*', ['copy-scripts']);
});
