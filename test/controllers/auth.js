/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var authCtrl = require('../../src/controllers/auth');
var login_obj = {
	usrnm: 'fuelusumar',
	passwd: '15946659'
};
var usr_obj = {
	usrnm: 'gefusu',
	passwd: '17952275',
	email: 'gefusu@gmail.com',
	name: 'Gerardo Fuenmayor',
	avatar_url: 'no_avatar'
};
try {
	describe('authCtrl', function () {
		describe('database connection', function () {
			this.timeout(2000);
			it('should connect before doing any action', function (done) {
				var db = require('../../src/config/initializers/database');
				done();
			});
		});
		describe('#signin()', function () {
			it('should return an user object', function (done) {
				authCtrl.signin(usr_obj, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing auth controller\n', err);
					} else {
						assert.equal(status, 201);
						assert.equal(res.usrnm, usr_obj.usrnm);
						assert.equal(res.email, usr_obj.email);
						assert.equal(res.name, usr_obj.name);
						assert.equal(res.avatar_url, usr_obj.avatar_url);
						usr_obj._id = res._id;
						done();
					}
				});
			});
		});
		describe('#login()', function () {
			it('should return an user model', function (done) {
				authCtrl.login(login_obj, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(status, 200);
					assert.equal(res.usrnm, login_obj.usrnm);
					done();
				});
			});
		});
	});
} catch (err) {
	winston.log('error', 'Error testing user service\n', err);
}