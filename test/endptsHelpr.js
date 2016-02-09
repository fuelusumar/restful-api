/* global describe, it */
var assert = require('assert');
var endpointsInit = require('../src/config/initializers/endpoints');
var endptsHelpr = require('../src/helpers/endpoints');
describe('endptsHelpr', function () {
	describe('#getLinks()', function () {
		it('should return an array of endpoints', function () {
			Array.isArray(endptsHelpr.getLinks('v1', 'users'));
		});
		it('should return an array of endpoints', function () {
			Array.isArray(endptsHelpr.getLinks('v1', 'friends', true, 'http://api.restful.org'));
		});
		it('should return an array of endpoints', function () {
			Array.isArray(endptsHelpr.getLinks('v1', 'friends', true, 'http://api.restful.org', {
				user_id: 16,
				friend_id: 31
			}));
		});
	});
});