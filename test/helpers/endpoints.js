/* global describe, it */
var assert = require('assert');
var endptsHelpr = require('../../src/helpers/endpoints');
describe('endptsHelpr', function () {
	describe('#loadEnpoints()', function () {
		it('should initialize endpoints', function (done) {
			require('../../src/config/initializers/endpoints');
			done();
		});
		it('should return an array of controllers', function (done) {
			var result = endptsHelpr.loadEnpoints('v1').getLinks();
			assert.ok(Array.isArray(result.users));
			done();
		});
		it('should return an array of endpoints', function (done) {
			var result = endptsHelpr.loadEnpoints('v1', 'users').getLinks();
			assert.ok(Array.isArray(result));
			done();
		});
		it('should return an array of endpoints', function (done) {
			var result = endptsHelpr.loadEnpoints('v1', 'friends').getHyper('http://api.restful.org');
			assert.ok(Array.isArray(result));
			done();
		});
		it('should return an array of endpoints', function (done) {
			var result = endptsHelpr.loadEnpoints('v1', 'friends').getHyper('GET', 'http://api.restful.org', '/v1/users/16/friends/31', {
				user_id: 16,
				friend_id: 31
			});
			assert.ok(Array.isArray(result));
			done();
		});
	});
});