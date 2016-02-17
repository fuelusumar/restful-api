var valdHlpr = require('../helpers/validate');
var authHlpr = require('../helpers/auth');
var usrSrv = require('../services/user');
var UsrMdl = require('../models/user');
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
					return callback(null, authHlpr.addToken(result), 201);
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
						authHlpr.doLogin(usr, log_obj, function (error, result, status) {
							return callback(error, authHlpr.addToken(result), status);
						});
					}
				});
			} else if (valdHlpr.isUsrnm(log_obj.usrnm)) {
				usrSrv.findUsrByUsrnm(log_obj.usrnm, function (err, usr) {
					if (err) {
						return callback(err, null, 500);
					} else {
						authHlpr.doLogin(usr, log_obj, function (error, result, status) {
							return callback(error, authHlpr.addToken(result), status);
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