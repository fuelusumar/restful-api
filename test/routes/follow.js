/* global describe, it */
var winston = require('winston');
var supertest = require('supertest');
var should = require('should');
var assert = require('assert');
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
var tkn, usr, usrs;
var _ids = [];
var login_obj = {
	usrnm: 'fuelusumar',
	passwd: '15946659'
};
// UNIT test begin
describe('follow router', function () {
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
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('usrnm');
					res.body.links.should.be.instanceof(Array);
					tkn = "bearer " + res.body.auth;
					usr = res.body.data;
					done();
				});
		});
	});
	describe("list users route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.get("/v1/users") //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing user router\n', res.body);
					}
					res.status.should.equal(200);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.be.an.instanceOf(Array);
					res.body.links.should.be.instanceof(Array);
					usrs = res.body.data;
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
	});
	describe("create follow route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.post("/v1/users/" + usrs[0]._id + "/follows") //
				.set("Authorization", tkn) //
				.send({
					user_id: usrs[1]._id
				}).expect("Content-type", /json/) //
				.expect(201) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(201);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.links.should.be.instanceof(Array);
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('_usr');
					res.body.data.should.have.property('_flw');
					res.body.data.should.have.property('upd_at');
					_ids.push(res.body.data._id);
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
		it("should return a valid response", function (done) {
			// calling home page api
			server.post("/v1/users/" + usrs[1]._id + "/follows") //
				.set("Authorization", tkn) //
				.send({
					user_id: usrs[0]._id
				}).expect("Content-type", /json/) //
				.expect(201) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(201);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.links.should.be.instanceof(Array);
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('_usr');
					res.body.data.should.have.property('_flw');
					res.body.data.should.have.property('upd_at');
					_ids.push(res.body.data._id);
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
	});
	describe("list follows route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.get("/v1/users/" + usr._id + "/follows") //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(200);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.be.an.instanceOf(Array);
					res.body.links.should.be.instanceof(Array);
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
	});
	describe("list follows me route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.get("/v1/users/" + usr._id + "/follows/me") //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(200);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.be.an.instanceOf(Array);
					res.body.links.should.be.instanceof(Array);
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
	});
	describe("retrieve follow route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.get("/v1/users/" + usr._id + "/follows/" + _ids[0]) //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(200);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('_usr');
					res.body.data.should.have.property('_flw');
					res.body.data.should.have.property('upd_at');
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
		it("should return a valid response", function (done) {
			// calling home page api
			server.get("/v1/users/" + usr._id + "/follows/" + _ids[1]) //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(200);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('_usr');
					res.body.data.should.have.property('_flw');
					res.body.data.should.have.property('upd_at');
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
	});
	describe("options follow route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.options("/v1/users/" + usr._id + "/follows") //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(200);
					res.body.should.have.property('action');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.links.should.be.instanceof(Array);
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
	});
	describe("options follow route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.options("/v1/users/" + usr._id + "/follows/" + _ids[0]) //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(200);
					res.body.should.have.property('action');
					res.body.should.have.property('links');
					res.body.should.have.property('auth');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.links.should.be.instanceof(Array);
					tkn = "bearer " + res.body.auth;
					done();
				});
		});
	});
	describe("delete follow route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.delete("/v1/users/" + usr._id + "/follows/" + _ids[0]) //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(204) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(204);
					done();
				});
		});
		it("should return a valid response", function (done) {
			// calling home page api
			server.delete("/v1/users/" + usr._id + "/follows/" + _ids[1]) //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(204) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing follow router\n', res.body);
					}
					res.status.should.equal(204);
					done();
				});
		});
	});
});