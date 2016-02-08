var gulp = require('gulp');
var jshint = require('gulp-jshint');
var src_files = [
	'src/bin/*',
	'src/**/*.{js,json}',
	'src/*.{js,json}'];
//
gulp.task('jslint', function () {
	return gulp.src(src_files).pipe(jshint({
		'undef': true,
		'unused': false,
		'node': true,
		'nomen': true,
		'plusplus': false,
		'latedef': true
	})).pipe(jshint.reporter('jshint-stylish'));
	//.pipe(jshint.reporter('fail'))
	//.pipe(gulp.dest('dist'));
});
//
gulp.task('watch', function () {
	gulp.watch(src_files, ['jslint']);
});