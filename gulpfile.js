var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var src_files = [
	'src/bin/*',
	'src/**/*.{js,json}',
	'src/*.{js,json}'];
var test_files = ['test/*.{js,json}'];
var all_files = src_files.concat(test_files);
process.setMaxListeners(0);
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
gulp.task('mocha', ['jslint'], function () {
	return gulp.src(test_files, {
			read: false
		}).pipe(jshint.reporter('jshint-stylish'))
		// gulp-mocha needs filepaths so you can't have any plugins before it 
		.pipe(mocha());
});
//
gulp.task('watch', function () {
	gulp.watch(all_files, ['mocha']);
});