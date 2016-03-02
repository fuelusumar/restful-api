var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var apidoc = require('gulp-apidoc');
var nodemon = require('gulp-nodemon');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var src_files = [
	'*.{js,json}',
	'src/bin/*',
	'src/config/**/*.{js,json}',
	'src/controllers/**/*.{js,json}',
	'src/helpers/**/*.{js,json}',
	'src/models/**/*.{js,json}',
	'src/routes/**/*.{js,json}',
	'src/schemas/**/*.{js,json}',
	'src/services/**/*.{js,json}',
	'src/*.{js,json}',
	'test/**/*.{js,json}'];
var ctrl_files = [
	'test/controllers/auth.js',
	'test/controllers/user.js',
	'test/controllers/follow.js'
];
var help_files = [
	'test/helpers/auth.js',
	'test/helpers/endpoints.js',
	'test/helpers/validate.js'
];
var modl_files = [
	'test/models/user.js'
];
var rout_files = [
	'test/routes/auth.js',
	'test/routes/user.js',
	'test/routes/follow.js'
];
var serv_files = [
	'test/services/user.js',
	'test/services/follow.js'
];
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
});
// mocha tests task for files that don't require database connection
gulp.task('helpers', ['jslint'], function () {
	return gulp.src(help_files, {
			read: false
		}).pipe(jshint.reporter('jshint-stylish')) //
		.pipe(mocha()) // 
		.once('end', function () {
			process.exit();
		});
});
// mocha tests task for files that don't require database connection
gulp.task('models', ['jslint'], function () {
	return gulp.src(modl_files, {
			read: false
		}).pipe(jshint.reporter('jshint-stylish')) //
		.pipe(mocha()) // 
		.once('end', function () {
			process.exit();
		});
});
// mocha tests task for services files that require database connection
gulp.task('services', ['jslint'], function () {
	return gulp.src(serv_files).pipe(jshint.reporter('jshint-stylish')) //
		.pipe(mocha()) //
		.once('end', function () {
			process.exit();
		});
});
// mocha tests task for controllers files that require database connection
gulp.task('controllers', ['jslint'], function () {
	return gulp.src(ctrl_files).pipe(jshint.reporter('jshint-stylish')) //
		.pipe(mocha()) //
		.once('end', function () {
			process.exit();
		});
});
// mocha tests task for controllers files that don't require database connection
// this mocha it requires the server to be running
gulp.task('routers', ['jslint'], function () {
	return gulp.src(rout_files).pipe(jshint.reporter('jshint-stylish')) //
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
// clean folder task
gulp.task('clean', function () {
	return gulp.src(['build'], {
			read: false
		}) // much faster 
		//.pipe(ignore('build')) //
		.pipe(rimraf({
			force: true
		}));
});
// build task
gulp.task('build', ['clean', 'apidoc'], function () {
	gulp.src(['src/**', 'src/*', '*.json']).pipe(ignore('deploy.json')).pipe(gulp.dest('build'));
});
// watch files changes
gulp.task('watch', function () {
	gulp.watch(src_files, ['jslint']);
});
// nodemon watch runs and refreshes the server when a file is modified
gulp.task('daemon', function () {
	nodemon({
		script: 'src/bin/www',
		ext: 'js html json',
		watch: ['src/**/*'],
		ignore: ['test/**/*'],
		env: {
			'NODE_ENV': 'development'
		}
	});
});