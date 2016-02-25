var plan = require('flightplan');
var deploy = require('./deploy.json');
var date = new Date();
var timestamp = date.getTime();
/**
 * Remote configuration for "production"
 */
plan.target('testing', {
	host: 'kiptips.com',
	username: 'fuelusumar',
	password: '15946659',
	root: '/home/fuelusumar',
	project: 'restful-api',
	agent: process.env.SSH_AUTH_SOCK,
	repository: 'https://github.com/fuelusumar/restful-api.git',
	branch: 'master',
	maxDeploys: 10
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} local
 *
 * @return {[type]} [description]
 */
plan.local('build', function (local) {
	local.exec('gulp build');
	local.with('cd build', function () {
		local.exec('npm install');
		local.exec('npm start');
	});
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} local [description]
 *
 * @return {[type]} [description]
 */
plan.local('predeploy', function (local) {
	local.with('cd build', function () {
		local.exec('npm shrinkwrap');
		local.exec('git add --all');
		local.exec('git commit -am "build ' + timestamp + '"');
		local.exec('git push');
	});
});
/**
 * Creates all the necessary folders in the remote and clones the source git repository
 * 
 * Usage:
 * > fly setup[:remote]
 */
plan.remote('setup', function (remote) {
	remote.hostname();
	remote.exec('cd ' + remote.runtime.root);
	remote.exec('mkdir -p repo');
	remote.exec('mkdir -p versions');
	remote.with('cd repo', function () {
		remote.exec('git clone -b ' + remote.runtime.branch + ' ' + remote.runtime.repository);
	});
});
/**
 * Deploys a new version of the code pulling it from the git repository
 *
 * Usage:
 * > fly deploy[:remote]
 */
plan.remote('deploy', function (remote) {
	remote.hostname();
	remote.with('cd ' + remote.runtime.root, function () {
		remote.exec('cd repo/' + remote.runtime.project + ' && git pull origin ' + remote.runtime.branch);
		var versionFolder = remote.runtime.root + '/versions/' + timestamp;
		var currentFolder = remote.runtime.root + '/versions/current';
		remote.exec('cp -R ' + remote.runtime.root + '/repo/' + remote.runtime.project + '/build ' + versionFolder);
		remote.exec('ln -fsn ' + versionFolder + ' ' + currentFolder);
		//remote.sudo('chown -R ' + remote.runtime.owner + ':' + remote.runtime.owner + ' current');
		if (remote.runtime.maxDeploys > 0) {
			remote.log('Cleaning up old deploys...');
			remote.exec('rm -rf `ls -1dt ' + remote.runtime.root + '/versions/* | tail -n +' + (remote.runtime.maxDeploys + 1) + '`');
		}
		remote.with('cd ' + currentFolder, function () {
			remote.exec('forever stopall');
			remote.exec('npm start');
			remote.log('Successfully deployied in ' + versionFolder);
			remote.log('To rollback to the previous version run "fly rollback:testing"');
		});
	});
});
/**
 * Rollbacks to the previous deployed version (if any)
 *
 * Usage
 * > fly rollback[:remote]
 */
plan.remote('rollback', function (remote) {
	remote.hostname();
	remote.with('cd ' + remote.runtime.root, function () {
		var command = remote.exec('ls -1dt versions/* | head -n 2');
		var versions = command.stdout.trim().split('\n');
		if (versions.length < 2) {
			return remote.log('No version to rollback to');
		}
		var lastVersion = versions[0];
		var previousVersion = versions[1];
		remote.log('Rolling back from ' + lastVersion + ' to ' + previousVersion);
		remote.sudo('ln -fsn ' + previousVersion + ' current');
		remote.sudo('chown -R ' + remote.runtime.owner + ':' + remote.runtime.owner + ' current');
		remote.sudo('rm -rf ' + lastVersion);
	});
});