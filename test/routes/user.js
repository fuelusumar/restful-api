/* global describe, it */
var winston = require('winston');
var supertest = require('supertest');
var should = require('should');
var assert = require('assert');
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
var _id;
var usr_obj = {
	usrnm: 'gefusu',
	passwd: '17952275',
	email: 'gefusu@gmail.com',
	name: 'Gerardo Jose Fuenmayor',
	avatar_url: 'no_avatar'
};
var tkn = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmM1ZmMyYjhlMmNmZmI5NjQxOWM3NTIiLCJ1c3IiOiJmdWVsdXN1bWFyIiwiaWF0IjoxNDU2NzY1OTU4LCJleHAiOjE0NTY4NTIzNTh9.LArkjbEKWi0njoH06y-krgzPwesTL0mNFP-XDDAiybY";
var upd_obj = {
	name: 'Gerardo Fuenmayor'
};
// UNIT test begin
describe('user router', function () {
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
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.be.an.instanceOf(Array);
					res.body.links.should.be.instanceof(Array);
					done();
				});
		});
	});
	describe("create user route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.post("/v1/users") //
				.set("Authorization", tkn) //
				.send(usr_obj) //
				.expect("Content-type", /json/) //
				.expect(201) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing user router\n', res.body);
					}
					res.status.should.equal(201);
					res.body.should.have.property('action');
					res.body.should.have.property('data');
					res.body.should.have.property('links');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('usrnm');
					res.body.data.should.have.property('email');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('avatar_url');
					res.body.links.should.be.instanceof(Array);
					_id = res.body.data._id;
					upd_obj._id = res.body.data._id;
					done();
				});
		});
	});
	describe("retrieve user route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.get("/v1/users/" + _id) //
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
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('usrnm');
					res.body.data.should.have.property('email');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('avatar_url');
					res.body.links.should.be.instanceof(Array);
					done();
				});
		});
	});
	describe("update users route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.put("/v1/users/" + _id) //
				.set("Authorization", tkn) //
				.send(upd_obj) //
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
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('usrnm');
					res.body.data.should.have.property('email');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('avatar_url');
					res.body.data.name.should.equal(upd_obj.name);
					res.body.links.should.be.instanceof(Array);
					//upd_obj.name = "Luis Gerardo Fuenmayor";
					done();
				});
		});
	});
	describe("partial update users route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.patch("/v1/users/" + _id) //
				.set("Authorization", tkn) //
				.send(upd_obj) //
				.expect("Content-type", /json/) //
				.expect(304) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing user router\n', res.body);
					}
					res.status.should.equal(304);
					done();
				});
		});
	});
	describe("options users route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.options("/v1/users") //
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
					res.body.should.have.property('links');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.links.should.be.instanceof(Array);
					done();
				});
		});
	});
	describe("options users route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.options("/v1/users/" + _id) //
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
					res.body.should.have.property('links');
					res.body.should.not.have.property('error');
					res.body.should.not.have.property('stack');
					res.body.links.should.be.instanceof(Array);
					done();
				});
		});
	});
	describe("delete users route", function () {
		// #1 should return home page
		it("should return a valid response", function (done) {
			// calling home page api
			server.delete("/v1/users/" + _id) //
				.set("Authorization", tkn) //
				.expect("Content-type", /json/) //
				.expect(200) // THis is HTTP response
				.end(function (err, res) {
					// HTTP status should be 200
					if (res.status >= 400) {
						winston.log('error', 'Error testing user router\n', res.body);
					}
					res.status.should.equal(204);
					done();
				});
		});
	});
});