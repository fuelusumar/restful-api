var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var src_files = [
	'src/bin/*',
	'src/**/*.{js,json}',
	'src/*.{js,json}'];
var test_files = ['test/*.{js,json}'];
var serv_files = ['test/database/services/*.{js,json}'];
var ctrl_files = ['test/database/controllers/*.{js,json}'];
var db_files = serv_files.concat(ctrl_files);
var watch_files = src_files.concat(test_files.concat(db_files));
process.setMaxListeners(0);
// jslint task for source files and tests that don't require database connection
gulp.task('jslint', function () {
	return gulp.src(watch_files).pipe(jshint({
		'undef': true,
		'unused': false,
		'node': true,
		'nomen': true,
		'plusplus': false,
		'latedef': true
	})).pipe(jshint.reporter('jshint-stylish'));
	//.pipe(gulp.dest('dist'));
});
// mocha tests task for files that don't require database connection
gulp.task('mocha', ['jslint'], function () {
	return gulp.src(test_files, {
		read: false
	}).pipe(mocha());
});
// mocha tests task for services files that require database connection
gulp.task('services', function () {
	return gulp.src(serv_files) //
		.pipe(mocha()) //
		.once('end', function () {
			process.exit();
		});
});
// mocha tests task for controllers files that require database connection
gulp.task('controllers', function () {
	return gulp.src(ctrl_files) //
		.pipe(mocha()) //
		.once('end', function () {
			process.exit();
		});
});
// watch files changes
gulp.task('watch', function () {
	gulp.watch(watch_files, ['mocha']);
});