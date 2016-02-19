/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var security = require('../../src/config/initializers/security');
var usrSrv = require('../../src/services/user');
var authHelpr = require('../../src/helpers/auth');
describe('authHelpr', function () {
	describe('database connection', function () {
		this.timeout(2000);
		it('should connect before doing any action', function (done) {
			var db = require('../../src/config/initializers/database');
			done();
		});
	});
	describe('#getToken()', function () {
		it('should have tkn', function (done) {
			usrSrv.findUsrByUsrnm('fuelusumar', function (err, res) {
				if (err) {
					winston.log('error', 'Error testing user service\n', err);
					done();
				}
				var usr = authHelpr.getToken(res);
				winston.log('info', 'Token: ', usr.tkn);
				assert.ok(usr.tkn);
				done();
			});
		});
	});
});