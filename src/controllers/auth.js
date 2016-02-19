var valdHlpr = require('../helpers/validate');
var authHlpr = require('../helpers/auth');
var usrSrv = require('../services/user');
var UsrMdl = require('../models/user');
/**
 * [doLogin description]
 *
 * @method doLogin
 *
 * @param  {[type]}   usr      [description]
 * @param  {[type]}   login    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
var doLogin = function (usr, login, callback) {
	if (usr.usrnm == login.usrnm || usr.email == login.usrnm) {
		if (login.passwd == usr.passwd) {
			usrSrv.updateUsrById(usr._id, {
				is_active: true
			}, function (err, res) {
				if (err) {
					return callback(err, null, 500);
				} else {
					return callback(null, usr, 200);
				}
			});
		} else {
			return callback(new Error('invalid password'), null, 400);
		}
	} else {
		return callback(new Error('invalid username or email'), null, 400);
	}
};
/**
 * [signin description]
 *
 * @method signin
 *
 * @param  {[type]}   usr_obj  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.signin = function (usr_obj, callback) {
	try {
		if (!usr_obj || Object.keys(usr_obj).length < 5) {
			return callback(Error('invalid user object or not enough parameters'), null, 400);
		} else {
			var usr = new UsrMdl(usr_obj);
			usr.validate();
			usrSrv.insertUsr(usr, function (error, result) {
				if (error) {
					return callback(error, null, 500);
				} else {
					return callback(null, result, 201);
				}
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};
/**
 * [login description]
 *
 * @method login
 *
 * @param  {[type]}   log_obj  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.login = function (log_obj, callback) {
	try {
		if (!log_obj || Object.keys(log_obj).length < 2) {
			return callback(Error('invalid login object or not enough parameters'), null, 400);
		} else {
			if (valdHlpr.isEmail(log_obj.usrnm)) {
				usrSrv.findUsrByEmail(log_obj.usrnm, function (err, usr) {
					if (err) {
						return callback(err, null, 500);
					} else {
						doLogin(usr, log_obj, function (error, result, status) {
							return callback(error, result, status);
						});
					}
				});
			} else if (valdHlpr.isUsrnm(log_obj.usrnm)) {
				usrSrv.findUsrByUsrnm(log_obj.usrnm, function (err, usr) {
					if (err) {
						return callback(err, null, 500);
					} else {
						doLogin(usr, log_obj, function (error, result, status) {
							return callback(error, result, status);
						});
					}
				});
			} else {
				return callback(Error('invalid login parameter'), null, 400);
			}
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};