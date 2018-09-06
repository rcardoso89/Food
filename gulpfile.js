var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import');

gulp.task('default', function(){
  console.log("I have just created a gulp task");
});

gulp.task('styles', function() {
  return gulp.src('./src/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('watch', function(){

  watch('./src/styles/modules/**/*.css', function(){
    gulp.start('styles');
  });

});
