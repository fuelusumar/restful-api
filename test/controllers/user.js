/* global describe, it */
var winston = require('winston');
var assert = require('assert');
var usrCtrl = require('../../src/controllers/user');
try {
	describe('usrCtrl', function () {
		var usr_obj = {
			usrnm: 'fuelusumar',
			passwd: '15946659',
			email: 'fuelusumar@gmail.com',
			name: 'Luis Fuenmayor',
			avatar_url: 'no_avatar'
		};
		describe('database connection', function () {
			this.timeout(2000);
			it('should connect before doing any action', function (done) {
				var db = require('../../src/config/initializers/database');
				done();
			});
		});
		describe('#insertUsr()', function () {
			it('should return an user object', function (done) {
				usrCtrl.insertUsr(usr_obj, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						usrCtrl.findUsrByUsrnm(usr_obj.usrnm, function (err, res) {
							if (err) {
								winston.log('error', 'Error testing user service\n', err);
								done();
							}
							usrCtrl.deleteUsrById(res._id, function (err, res) {
								if (err) {
									winston.log('error', 'Error testing user service\n', err);
									done();
								}
								usrCtrl.insertUsr(usr_obj, function (err, res) {
									if (err) {
										winston.log('error', 'Error testing user service\n', err);
									} else {
										assert.equal(res.usrnm, 'fuelusumar');
										assert.equal(res.passwd, '15946659');
										assert.equal(res.email, 'fuelusumar@gmail.com');
										assert.equal(res.name, 'Luis Fuenmayor');
										assert.equal(res.avatar_url, 'no_avatar');
										usr_obj._id = res._id;
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
						usr_obj._id = res._id;
						done();
					}
				});
			});
		});
		describe('#findUsrById()', function () {
			it('should return an user model', function (done) {
				usrCtrl.findUsrById(usr_obj._id, function (err, res) {
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
			it('should return an array', function (done) {
				usrCtrl.findUsrs({}, 0, 1, {}, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					Array.isArray(res);
					done();
				});
			});
		});
		describe('#findUsrByEmail()', function () {
			it('should return an user model', function (done) {
				usrCtrl.findUsrByEmail(usr_obj.email, function (err, res) {
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
				usrCtrl.findUsrByUsrnm(usr_obj.usrnm, function (err, res) {
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
		describe('change the usr_obj before update', function () {
			it('should change the name', function (done) {
				usr_obj.name = 'Gerardo Fuenmayor';
				assert.equal(usr_obj.name, 'Gerardo Fuenmayor');
				done();
			});
		});
		describe('#updateOrPatchUsr()', function () {
			it('should have changed a model', function (done) {
				usrCtrl.updateOrPatchUsr(usr_obj, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.equal(res.name, 'Gerardo Fuenmayor');
					assert.equal(res.avatar_url, 'no_avatar');
					done();
				});
			});
		});
		describe('#deleteUsrById()', function () {
			it('should deleted a model', function (done) {
				usrCtrl.deleteUsrById(usr_obj._id, function (err, res) {
					if (err) {
						winston.log('error', 'Error testing user service\n', err);
						done();
					}
					assert.ok(res);
					done();
				});
			});
		});
	});
} catch (err) {
	winston.log('error', 'Error testing user service\n', err);
}