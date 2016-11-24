var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucks = require('gulp-nunjucks');
var browserSync = require('browser-sync').create(); 

/**
 *
 * Styles Compilation
 *
 */
gulp.task('sass', () => {
	return gulp.src(['src/scss/intrepits.scss', 'src/scss/brand.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
})

/**
 *
 * Images Compilation, minification and improvements
 *
 */
gulp.task('img', () => {
	return gulp.src('src/img/**/*')
		.pipe(gulp.dest('dist/img'));
})


/**
 *
 * Html generation and compilation 
 *
 */
gulp.task('html', () => {
	return gulp.src('src/html/index.html')
		.pipe(nunjucks.compile())
		.pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});


gulp.task('serve', ['sass', 'html'], () => {
	browserSync.init({
		server: { baseDir: './dist/' }
	});

	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/html/**/*.html', ['html']);
}); 
