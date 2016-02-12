/* global describe, it */
var assert = require('assert');
var validHelpr = require('../../src/helpers/validate');
describe('validHelpr', function () {
	describe('#isObjectID()', function () {
		it('should accept "56a90e03c008928f3af84767"', function (done) {
			assert.ok(validHelpr.isObjectID("56a90e03c008928f3af84767"));
			done();
		});
		it('should not accept "56a90e03c008928f3af8476z"', function (done) {
			assert.ok(!validHelpr.isObjectID("56a90e03c008928f3af8476z"));
			done();
		});
	});
	describe('#isDate()', function () {
		it('should accept "2015-09-01T00:00:00.0Z"', function (done) {
			assert.ok(validHelpr.isDate("2015-09-01T00:00:00.0Z"));
			done();
		});
		it('should not accept "2015-31-32T00:00:00.0Z"', function (done) {
			assert.ok(!validHelpr.isDate("2015-31-32T00:00:00.0Z"));
			done();
		});
	});
	describe('#isEmail()', function () {
		it('should accept "user@domain.com"', function (done) {
			assert.ok(validHelpr.isEmail("user@domain.com"));
			done();
		});
		it('should not accept "us#$%&/()er@domain.comassdsdsdsdsd"', function (done) {
			assert.ok(!validHelpr.isEmail("us#$%&/()er@domain.comassdsdsdsdsd"));
			done();
		});
	});
	describe('#isUsrnm()', function () {
		it('should accept "pepo_12.com"', function (done) {
			assert.ok(validHelpr.isUsrnm("pepo_12.com"));
			done();
		});
		it('should not accept "pepo_1#2.com"', function (done) {
			assert.ok(!validHelpr.isUsrnm("pepo_1#2.com"));
			done();
		});
	});
});