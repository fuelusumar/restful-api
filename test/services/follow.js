/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var FlwMdl = require('../../src/models/follow');
var flwSrv = require('../../src/services/follow');
var UsrMdl = require('../../src/models/user');
var usrSrv = require('../../src/services/user');
try {
	describe('usrSrv', function () {
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
		var _id = null;
		var _usr = null;
		var _flw = null;
		describe('database connection', function () {
			this.timeout(2000);
			it('should connect before doing any action', function (done) {
				var db = require('../../src/config/initializers/database');
				done();
			});
		});
		describe('#insertUsr(usr)', function () {
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
							_usr = res._id;
							done();
						});
					} else {
						assert.equal(res.usrnm, usr.usrnm);
						assert.equal(res.email, usr.email);
						assert.equal(res.name, usr.name);
						assert.equal(res.avatar_url, usr.avatar_url);
						_usr = res._id;
						done();
					}
				});
			});
		});
		describe('#insertUsr(flw)', function () {
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
							_flw = res._id;
							done();
						});
					} else {
						assert.equal(res.usrnm, flw.usrnm);
						assert.equal(res.email, flw.email);
						assert.equal(res.name, flw.name);
						assert.equal(res.avatar_url, flw.avatar_url);
						_flw = res._id;
						done();
					}
				});
			});
		});
		describe('#insertFlw()', function () {
			it('should return an follow model', function (done) {
				var flw = new FlwMdl({
					_usr: _usr,
					_flw: _flw
				});
				flwSrv.insertFlw(flw, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing follow service\n', err);
						done();
					}
					assert.equal(res._usr, _usr);
					assert.equal(res._flw, _flw);
					_id = res._id;
					done();
				});
			});
		});
		describe('#findFlwById()', function () {
			it('should return an follow model', function (done) {
				flwSrv.findFlwById(_id, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing follow service\n', err);
						done();
					}
					assert.equal(res._usr._id + '', _usr + '');
					assert.equal(res._flw._id + '', _flw + '');
					done();
				});
			});
		});
		describe('#findFlwByUsrId()', function () {
			it('should return an follow model', function (done) {
				flwSrv.findFlwByUsrId(_usr, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing follow service\n', err);
						done();
					}
					assert.equal(res._usr._id + '', _usr + '');
					assert.equal(res._flw._id + '', _flw + '');
					done();
				});
			});
		});
		describe('#findFlwByFlwId()', function () {
			it('should return an follow model', function (done) {
				flwSrv.findFlwByFlwId(_flw, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing follow service\n', err);
						done();
					}
					assert.equal(res._usr._id + '', _usr + '');
					assert.equal(res._flw._id + '', _flw + '');
					done();
				});
			});
		});
		describe('#findFlws()', function () {
			it('should return an follow model', function (done) {
				flwSrv.findFlws({}, 0, 1, {}, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing follow service\n', err);
						done();
					}
					assert.ok(Array.isArray(res));
					done();
				});
			});
		});
		describe('#findAllFlws()', function () {
			it('should return an follow model', function (done) {
				flwSrv.findAllFlws({}, {}, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing follow service\n', err);
						done();
					}
					assert.ok(Array.isArray(res));
					done();
				});
			});
		});
		describe('#deleteFlwById()', function () {
			it('should delete one registry', function (done) {
				flwSrv.deleteFlwById(_id, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing follow service\n', err);
						done();
					}
					assert.ok(res.result.ok);
					assert.equal(res.result.n, 1);
					done();
				});
			});
		});
		describe('#deleteAllFlws()', function () {
			it('should be ok', function (done) {
				flwSrv.deleteAllFlws(function (err, res) {
					if (err) {
						winston.log('error', 'Error testing follow service\n', err);
						done();
					}
					assert.ok(res.result.ok);
					done();
				});
			});
		});
	});
} catch (err) {
	winston.log('error', 'Error testing follow service\n', err);
}