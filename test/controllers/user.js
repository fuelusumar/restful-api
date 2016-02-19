/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var usrCtrl = require('../../src/controllers/user');
var usr_obj = {
	usrnm: 'gefusu',
	passwd: '17952275',
	email: 'gefusu@gmail.com',
	name: 'Gerardo Fuenmayor',
	avatar_url: 'no_avatar'
};
try {
	describe('usrCtrl', function () {
		describe('database connection', function () {
			this.timeout(2000);
			it('should connect before doing any action', function (done) {
				var db = require('../../src/config/initializers/database');
				done();
			});
		});
		describe('#insertUsr()', function () {
			it('should return an user object', function (done) {
				usrCtrl.insertUsr(usr_obj, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing user controller\n', err);
						usrCtrl.findUsrByUsrnm(usr_obj.usrnm, function (err, res, status) {
							if (err) {
								winston.log('error', 'Error testing user controller\n', err);
								done();
							}
							usrCtrl.deleteUsrById(res._id, function (err, res, status) {
								if (err) {
									winston.log('error', 'Error testing user controller\n', err);
									done();
								}
								usrCtrl.insertUsr(usr_obj, function (err, res, status) {
									if (err) {
										winston.log('error', 'Error testing user controller\n', err);
									} else {
										assert.equal(status, 201);
										assert.equal(res.usrnm, usr_obj.usrnm);
										assert.equal(res.passwd, usr_obj.passwd);
										assert.equal(res.email, usr_obj.email);
										assert.equal(res.name, usr_obj.name);
										assert.equal(res.avatar_url, usr_obj.avatar_url);
										usr_obj._id = res._id;
										done();
									}
								});
							});
						});
					} else {
						assert.equal(status, 201);
						assert.equal(res.usrnm, usr_obj.usrnm);
						assert.equal(res.passwd, usr_obj.passwd);
						assert.equal(res.email, usr_obj.email);
						assert.equal(res.name, usr_obj.name);
						assert.equal(res.avatar_url, usr_obj.avatar_url);
						usr_obj._id = res._id;
						done();
					}
				});
			});
		});
		describe('#findUsrById()', function () {
			it('should return an user model', function (done) {
				usrCtrl.findUsrById(usr_obj._id, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing user controller\n', err);
						done();
					}
					assert.equal(status, 200);
					assert.equal(res.usrnm, usr_obj.usrnm);
					assert.equal(res.passwd, usr_obj.passwd);
					assert.equal(res.email, usr_obj.email);
					assert.equal(res.name, usr_obj.name);
					assert.equal(res.avatar_url, usr_obj.avatar_url);
					done();
				});
			});
		});
		describe('#findUsrs()', function () {
			it('should return an array', function (done) {
				usrCtrl.findUsrs({}, 1, {}, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing user controller\n', err);
						done();
					}
					assert.equal(status, 200);
					Array.isArray(res);
					done();
				});
			});
		});
		describe('#findUsrByEmail()', function () {
			it('should return an user model', function (done) {
				usrCtrl.findUsrByEmail(usr_obj.email, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing user controller\n', err);
						done();
					}
					assert.equal(status, 200);
					assert.equal(res.usrnm, usr_obj.usrnm);
					assert.equal(res.passwd, usr_obj.passwd);
					assert.equal(res.email, usr_obj.email);
					assert.equal(res.name, usr_obj.name);
					assert.equal(res.avatar_url, usr_obj.avatar_url);
					done();
				});
			});
		});
		describe('#findUsrByUsrnm()', function () {
			it('should return an user model', function (done) {
				usrCtrl.findUsrByUsrnm(usr_obj.usrnm, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing user controller\n', err);
						done();
					}
					assert.equal(status, 200);
					assert.equal(res.usrnm, usr_obj.usrnm);
					assert.equal(res.passwd, usr_obj.passwd);
					assert.equal(res.email, usr_obj.email);
					assert.equal(res.name, usr_obj.name);
					assert.equal(res.avatar_url, usr_obj.avatar_url);
					done();
				});
			});
		});
		describe('change the usr_obj before update', function () {
			it('should change the name', function (done) {
				usr_obj.name = 'Gerardo Jose Fuenmayor';
				assert.equal(usr_obj.name, 'Gerardo Jose Fuenmayor');
				done();
			});
		});
		describe('#updateOrPatchUsr()', function () {
			it('should have changed a model', function (done) {
				usrCtrl.updateOrPatchUsr(usr_obj, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing user controller\n', err);
						done();
					}
					assert.equal(status, 200);
					assert.equal(res.name, usr_obj.name);
					assert.equal(res.avatar_url, usr_obj.avatar_url);
					done();
				});
			});
		});
		describe('#deleteUsrById()', function () {
			it('should deleted a model', function (done) {
				usrCtrl.deleteUsrById(usr_obj._id, function (err, res, status) {
					if (err) {
						winston.log('error', 'Error testing user controller\n', err);
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
	winston.log('error', 'Error testing user controller\n', err);
}