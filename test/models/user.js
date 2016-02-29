/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var UsrMdl = require('../../src/models/user');
try {
	describe('UsrMdl', function () {
		var usr = new UsrMdl({
			usrnm: 'fuelusumar',
			passwd: '15946659',
			email: 'fuelusumar@gmail.com',
			name: 'Luis Fuenmayor',
			avatar_url: 'no_avatar'
		});
		describe('#constructor()', function () {
			it('should return an user object', function () {
				assert.equal(usr.usrnm, 'fuelusumar');
				assert.equal(usr.passwd, '15946659');
				assert.equal(usr.email, 'fuelusumar@gmail.com');
				assert.equal(usr.name, 'Luis Fuenmayor');
				assert.equal(usr.avatar_url, 'no_avatar');
			});
		});
	});
} catch (err) {
	winston.log('error', 'Error testing user model', err);
}