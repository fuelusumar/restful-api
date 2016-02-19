/* global describe, it */
var winston = require('winston');
var supertest = require('supertest');
var should = require('should');
var assert = require('assert');
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
var usr_obj = {
	usrnm: 'yoyi',
	passwd: '17952274',
	email: 'yoyi@gmail.com',
	name: 'Georgina Fuenmayor',
	avatar_url: 'no_avatar'
};
var login_obj = {
	usrnm: 'fuelusumar',
	passwd: '15946659'
};
// UNIT test begin
describe('auth router', function () {
	describe("signin route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.post("/v1/auth/signin") //
				.send(usr_obj) //
				.expect("Content-type", /json/) //
				.expect(201) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing auth router\n', res.body);
					}
					res.status.should.equal(201);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					console.dir(res.body.auth);
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('usrnm');
					res.body.links.should.be.instanceof(Array);
					done();
				});
		});
	});
	describe("login route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.post("/v1/auth/login") //
				.send(login_obj) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing auth router\n', res.body);
					}
					res.status.should.equal(200);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					console.dir(res.body.auth);
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('usrnm');
					res.body.links.should.be.instanceof(Array);
					done();
				});
		});
	});
});