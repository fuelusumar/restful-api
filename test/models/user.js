/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var UsrMdl = require('../../src/models/user');
try {
	describe('UsrMdl', function () {
		var usr = new UsrMdl('fuelusumar', '15946659', 'fuelusumar@gmail.com', 'Luis Fuenmayor', 'no_avatar');
		describe('#constructor()', function () {
			it('should return an user object', function () {
				assert.equal(usr.usrnm, 'fuelusumar');
				assert.equal(usr.passwd, '15946659');
				assert.equal(usr.email, 'fuelusumar@gmail.com');
				assert.equal(usr.name, 'Luis Fuenmayor');
				assert.equal(usr.avatar_url, 'no_avatar');
			});
		});
		describe('#show()', function () {
			it('should not has property passwd', function () {
				var usrShow = usr.show();
				assert.equal(typeof usrShow.passwd, 'undefined');
			});
		});
	});
} catch (err) {
	winston.log('error', 'Error testing user model', err);
}