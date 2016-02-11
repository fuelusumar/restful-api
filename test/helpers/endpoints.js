/* global describe, it */
var endptsHelpr = require('../../src/helpers/endpoints');
describe('endptsHelpr', function () {
	describe('#loadEnpoints()', function () {
		it('should initialize endpoints', function (done) {
			require('../../src/config/initializers/endpoints');
			done();
		});
		it('should return an array of controllers', function (done) {
			var result = endptsHelpr.loadEnpoints('v1').getLinks();
			Array.isArray(Array.isArray(result[0]));
			done();
		});
		it('should return an array of endpoints', function (done) {
			var result = endptsHelpr.loadEnpoints('v1', 'users').getLinks();
			Array.isArray(result);
			done();
		});
		it('should return an array of endpoints', function (done) {
			var result = endptsHelpr.loadEnpoints('v1', 'friends').getHyper('http://api.restful.org');
			console.dir(result);
			Array.isArray(result);
			done();
		});
		it('should return an array of endpoints', function (done) {
			var result = endptsHelpr.loadEnpoints('v1', 'friends').getHyper('GET', 'http://api.restful.org', '/v1/users/16/friends/31', {
				user_id: 16,
				friend_id: 31
			});
			console.dir(result);
			Array.isArray(result);
			done();
		});
	});
});