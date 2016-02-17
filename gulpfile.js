var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var apidoc = require('gulp-apidoc');
var src_files = ['*.{js,json}',
	'src/bin/*',
	'src/config/*.{js,json}',
	'src/controllers/*.{js,json}',
	'src/helpers/*.{js,json}',
	'src/models/*.{js,json}',
	'src/routes/*.{js,json}',
	'src/schemas/*.{js,json}',
	'src/services/*.{js,json}',
	'src/*.{js,json}',
	'test/**/*.js'];
//var test_files = ['test/**/*.{js,json}'];
var ctrl_files = ['test/controllers/*.{js,json}'];
var help_files = ['test/helpers/*.{js,json}'];
var modl_files = ['test/models/*.{js,json}'];
var rout_files = ['test/routes/*.{js,json}'];
var serv_files = ['test/services/*.{js,json}'];
//
process.setMaxListeners(0);
// jslint task for source files and tests that don't require database connection
gulp.task('jslint', function () {
	return gulp.src(src_files).pipe(jshint({
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
gulp.task('helpers', ['jslint'], function () {
	return gulp.src(help_files, {
		read: false
	}).pipe(mocha());
});
// mocha tests task for files that don't require database connection
gulp.task('models', ['jslint'], function () {
	return gulp.src(modl_files, {
		read: false
	}).pipe(mocha());
});
// mocha tests task for services files that require database connection
gulp.task('services', ['jslint'], function () {
	return gulp.src(serv_files) //
		.pipe(mocha()) //
		.once('end', function () {
			process.exit();
		});
});
// mocha tests task for controllers files that require database connection
gulp.task('controllers', ['jslint'], function () {
	return gulp.src(ctrl_files) //
		.pipe(mocha()) //
		.once('end', function () {
			process.exit();
		});
});
// mocha tests task for controllers files that don't require database connection
// this mocha it requires the server to be running
gulp.task('routers', ['jslint'], function () {
	return gulp.src(rout_files) //
		.pipe(mocha()) //
		.once('end', function () {
			process.exit();
		});
});
// apidoc task that generates route documentation
gulp.task('apidoc', function (done) {
	apidoc({
		src: "src/routes/",
		dest: "src/public/doc/"
	}, done);
});
// watch files changes
gulp.task('watch', function () {
	gulp.watch(src_files, ['jslint', 'apidoc']);
});