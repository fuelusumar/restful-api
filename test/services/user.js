/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var UsrMdl = require('../../src/models/user');
var usrSrv = require('../../src/services/user');
try {
	describe('usrSrv', function () {
		var usr = new UsrMdl('fuelusumar', '15946659', 'fuelusumar@gmail.com', 'Luis Fuenmayor', 'no_avatar');
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
						usrSrv.findUsrByUsrnm('fuelusumar', function (err, res) {
							if (err) {
								winston.log('error', 'Error testing user service\n', err);
								done();
							}
							usrSrv.delUsrById(res._id, function (err, res) {
								if (err) {
									winston.log('error', 'Error testing user service\n', err);
									done();
								}
								usrSrv.insertUsr(usr, function (err, res) {
									if (err) {
										winston.log('error', 'Error testing user service\n', err);
									} else {
										assert.equal(res.usrnm, 'fuelusumar');
										assert.equal(res.passwd, '15946659');
										assert.equal(res.email, 'fuelusumar@gmail.com');
										assert.equal(res.name, 'Luis Fuenmayor');
										assert.equal(res.avatar_url, 'no_avatar');
										_id = res._id;
										done();
									}
								});
							});
						});
					} else {
						assert.equal(res.usrnm, 'fuelusumar');
						assert.equal(res.passwd, '15946659');
						assert.equal(res.email, 'fuelusumar@gmail.com');
						assert.equal(res.name, 'Luis Fuenmayor');
						assert.equal(res.avatar_url, 'no_avatar');
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
					assert.equal(res.usrnm, 'fuelusumar');
					assert.equal(res.passwd, '15946659');
					assert.equal(res.email, 'fuelusumar@gmail.com');
					assert.equal(res.name, 'Luis Fuenmayor');
					assert.equal(res.avatar_url, 'no_avatar');
					done();
				});
			});
		});
		describe('#findUsrByEmail()', function () {
			it('should return an user model', function (done) {
				usrSrv.findUsrByEmail('fuelusumar@gmail.com', function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.usrnm, 'fuelusumar');
					assert.equal(res.passwd, '15946659');
					assert.equal(res.email, 'fuelusumar@gmail.com');
					assert.equal(res.name, 'Luis Fuenmayor');
					assert.equal(res.avatar_url, 'no_avatar');
					done();
				});
			});
		});
		describe('#findUsrByUsrnm()', function () {
			it('should return an user model', function (done) {
				usrSrv.findUsrByUsrnm('fuelusumar', function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.usrnm, 'fuelusumar');
					assert.equal(res.passwd, '15946659');
					assert.equal(res.email, 'fuelusumar@gmail.com');
					assert.equal(res.name, 'Luis Fuenmayor');
					assert.equal(res.avatar_url, 'no_avatar');
					done();
				});
			});
		});
		describe('#findUsrs()', function () {
			it('should return an array of user models', function (done) {
				usrSrv.findUsrs({}, 1, {}, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					Array.isArray(res);
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
					Array.isArray(res);
					done();
				});
			});
		});
		describe('#updateUsrById()', function () {
			it('should have changed a model', function (done) {
				usrSrv.updateUsrById(_id, {
					name: 'Gerardo Fuenmayor'
				}, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.ok, 1);
					assert.equal(res.nModified, 1);
					assert.equal(res.n, 1);
					done();
				});
			});
		});
		describe('#delUsrById()', function () {
			it('should deleted a model', function (done) {
				usrSrv.delUsrById(_id, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.result.ok, 1);
					assert.equal(res.result.n, 1);
					done();
				});
			});
		});
		describe('#delAllUsrs()', function () {
			it('should be ok', function (done) {
				usrSrv.delAllUsrs(function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.result.ok, 1);
					done();
				});
			});
		});
	});
} catch (err) {
	winston.log('error', 'Error testing user service\n', err);
}