/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var flwCtrl = require('../../src/controllers/follow');
var UsrMdl = require('../../src/models/user');
var usrSrv = require('../../src/services/user');
try {
	describe('flwCtrl', function () {
		var usr = new UsrMdl({
			usrnm: 'tatadelgado123',
			passwd: '21121734',
			email: 'tatadelgado123@gmail.com',
			name: 'Thais Delgado',
			avatar_url: 'no_avatar'
		});
		var flw = new UsrMdl({
			usrnm: 'fuelusumar',
			passwd: '15946659',
			email: 'fuelusumar@gmail.com',
			name: 'Luis Fuenmayor',
			avatar_url: 'no_avatar'
		});
		var rel = {};
		describe('database connection', function () {
			this.timeout(2000);
			it('should connect before doing any action', function (done) {
				var db = require('../../src/config/initializers/database');
				done();
			});
		});
		describe('usrSrv#insertUsr(usr)', function () {
			it('should return an user object', function (done) {
				usrSrv.insertUsr(usr, function (err, res) {
					if (err) {
						//winston.log('error', 'Error testing user service\n', err);
						usrSrv.findUsrByUsrnm(usr.usrnm, function (err, res) {
							if (err) {
								winston.log('error', 'Error testing user service\n', err);
								done();
							}
							assert.equal(res.usrnm, usr.usrnm);
							assert.equal(res.email, usr.email);
							assert.equal(res.name, usr.name);
							assert.equal(res.avatar_url, usr.avatar_url);
							rel._usr = res._id;
							done();
						});
					} else {
						assert.equal(res.usrnm, usr.usrnm);
						assert.equal(res.email, usr.email);
						assert.equal(res.name, usr.name);
						assert.equal(res.avatar_url, usr.avatar_url);
						rel._usr = res._id;
						done();
					}
				});
			});
		});
		describe('usrSrv#insertUsr(flw)', function () {
			it('should return an user object', function (done) {
				usrSrv.insertUsr(flw, function (err, res) {
					if (err) {
						//winston.log('error', 'Error testing user service\n', err);
						usrSrv.findUsrByUsrnm(flw.usrnm, function (err, res) {
							if (err) {
								winston.log('error', 'Error testing user service\n', err);
								done();
							}
							assert.equal(res.usrnm, flw.usrnm);
							assert.equal(res.email, flw.email);
							assert.equal(res.name, flw.name);
							assert.equal(res.avatar_url, flw.avatar_url);
							rel._flw = res._id;
							done();
						});
					} else {
						assert.equal(res.usrnm, flw.usrnm);
						assert.equal(res.email, flw.email);
						assert.equal(res.name, flw.name);
						assert.equal(res.avatar_url, flw.avatar_url);
						rel._flw = res._id;
						done();
					}
				});
			});
		});
		//insertFlw(flw_obj, callback)
		describe('#insertFlw()', function () {
			it('should return a follow model', function (done) {
				flwCtrl.insertFlw(rel, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing follow controller\n', err);
						done();
					}
					assert.equal(status, 201);
					assert.equal(res._usr, rel._usr);
					assert.equal(res._flw, rel._flw);
					rel._id = res._id;
					done();
				});
			});
		});
		//findFlwById(_id, callback)
		describe('#findFlwById()', function () {
			it('should return a follow model', function (done) {
				flwCtrl.findFlwById(rel._id, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing follow controller\n', err);
						done();
					}
					assert.equal(status, 200);
					assert.equal(res._usr._id + '', rel._usr + '');
					assert.equal(res._usr.usrnm + '', usr.usrnm + '');
					assert.equal(res._flw._id + '', rel._flw + '');
					assert.equal(res._flw.usrnm + '', flw.usrnm + '');
					done();
				});
			});
		});
		//findFlws(_usr_id, page, callback)
		describe('#findFlws()', function () {
			it('should return a follow models array', function (done) {
				flwCtrl.findFlws(rel._usr, 1, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing follow controller\n', err);
						done();
					}
					assert.equal(status, 200);
					assert.ok(Array.isArray(res));
					//console.dir(res);
					done();
				});
			});
		});
		//findFlwsMe(_usr_id, page, callback)
		describe('#findFlwsMe()', function () {
			it('should return a follow models array', function (done) {
				flwCtrl.findFlwsMe(rel._usr, 1, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing follow controller\n', err);
						done();
					}
					assert.equal(status, 200);
					assert.ok(Array.isArray(res));
					//console.dir(res);
					done();
				});
			});
		});
		//deleteFlwById(_id, callback)
		describe('#deleteFlwById()', function () {
			it('should delete one registry', function (done) {
				flwCtrl.deleteFlwById(rel._id, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing follow controller\n', err);
						done();
					}
					assert.equal(status, 204);
					assert.ok(res);
					done();
				});
			});
		});
	});
} catch (err) {
	winston.log('error', 'Error testing follow service\n', err);
}