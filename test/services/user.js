/* global describe, it */
var winston = require('winston');
var assert = require('assert');
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
		var _id = null;
		describe('database connection', function () {
			this.timeout(2000);
			it('should connect before doing any action', function (done) {
				var db = require('../../src/config/initializers/database');
				done();
			});
		});
		describe('#insertUsr()', function () {
			it('should return an user object', function (done) {
				usrSrv.insertUsr(usr, function (err, res) {
					if (err) {
						//winston.log('error', 'Error testing user service\n', err);
						usrSrv.findUsrByUsrnm(usr.usrnm, function (err, res) {
							if (err) {
								winston.log('error', 'Error testing user service\n', err);
								done();
							}
							usrSrv.deleteUsrById(res._id, function (err, res) {
								if (err) {
									winston.log('error', 'Error testing user service\n', err);
									done();
								}
								usrSrv.insertUsr(usr, function (err, res) {
									if (err) {
										winston.log('error', 'Error testing user service\n', err);
									} else {
										assert.equal(res.usrnm, usr.usrnm);
										assert.equal(res.email, usr.email);
										assert.equal(res.name, usr.name);
										assert.equal(res.avatar_url, usr.avatar_url);
										_id = res._id;
										done();
									}
								});
							});
						});
					} else {
						assert.equal(res.usrnm, usr.usrnm);
						assert.equal(res.email, usr.email);
						assert.equal(res.name, usr.name);
						assert.equal(res.avatar_url, usr.avatar_url);
						_id = res._id;
						done();
					}
				});
			});
		});
		describe('#findUsrById()', function () {
			it('should return an user model', function (done) {
				usrSrv.findUsrById(_id, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.usrnm, usr.usrnm);
					assert.equal(res.email, usr.email);
					assert.equal(res.name, usr.name);
					assert.equal(res.avatar_url, usr.avatar_url);
					done();
				});
			});
		});
		describe('#findUsrByEmail()', function () {
			it('should return an user model', function (done) {
				usrSrv.findUsrByEmail(usr.email, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.usrnm, usr.usrnm);
					assert.equal(res.passwd, usr.passwd);
					assert.equal(res.email, usr.email);
					assert.equal(res.name, usr.name);
					assert.equal(res.avatar_url, usr.avatar_url);
					done();
				});
			});
		});
		describe('#findUsrByUsrnm()', function () {
			it('should return an user model', function (done) {
				usrSrv.findUsrByUsrnm(usr.usrnm, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.usrnm, usr.usrnm);
					assert.equal(res.passwd, usr.passwd);
					assert.equal(res.email, usr.email);
					assert.equal(res.name, usr.name);
					assert.equal(res.avatar_url, usr.avatar_url);
					done();
				});
			});
		});
		describe('#findUsrs()', function () {
			it('should return an array of user models', function (done) {
				usrSrv.findUsrs({}, 0, 1, {}, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.ok(Array.isArray(res));
					done();
				});
			});
		});
		describe('#findAllUsrs()', function () {
			it('should return an array of user models', function (done) {
				usrSrv.findAllUsrs({}, {}, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.ok(Array.isArray(res));
					done();
				});
			});
		});
		describe('#updateUsrById()', function () {
			it('should have changed a model', function (done) {
				usrSrv.updateUsrById(_id, {
					name: 'Thais Dayana Delgado Nieves'
				}, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.ok(res.ok);
					assert.equal(res.nModified, 1);
					assert.equal(res.n, 1);
					done();
				});
			});
		});
		describe('#deleteUsrById()', function () {
			it('should deleted a model', function (done) {
				usrSrv.deleteUsrById(_id, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.ok(res.result.ok);
					assert.equal(res.result.n, 1);
					done();
				});
			});
		});
		describe('#deleteAllUsrs()', function () {
			it('should be ok', function (done) {
				usrSrv.deleteAllUsrs(function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.ok(res.result.ok);
					done();
				});
			});
		});
	});
} catch (err) {
	winston.log('error', 'Error testing user service\n', err);
}