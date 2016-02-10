var valdHlpr = require('../helpers/validate');
var usrSrv = require('../services/user');
var UsrMdl = require('../models/user');
/**
 * [findUsrByEmail description]
 *
 * @method findUsrByEmail
 *
 * @param  {[type]}       email    [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
exports.findUsrByEmail = function (email, callback) {
	try {
		if (valdHlpr.isEmail(email)) {
			usrSrv.findUsrByEmail(email, function (err, usr) {
				if (err) {
					return callback(err, null);
				}
				return callback(null, usr);
			});
		} else {
			return callback(new Error('invalid email'), null);
		}
	} catch (err) {
		return callback(err, null);
	}
};
/**
 * [findUsrByUsrnm description]
 *
 * @method findUsrByUsrnm
 *
 * @param  {[type]}       usrnm    [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
exports.findUsrByUsrnm = function (usrnm, callback) {
	try {
		if (valdHlpr.isUsrnm(usrnm)) {
			usrSrv.findUsrByUsrnm(usrnm, function (err, usr) {
				if (err) {
					return callback(err, null);
				}
				return callback(null, usr);
			});
		} else {
			return callback(new Error('invalid usrnm'), null);
		}
	} catch (err) {
		return callback(err, null);
	}
};
/**
 * [findUsr description]
 *
 * @method findUsr
 *
 * @param  {[type]}   _id      [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findUsr = function (_id, callback) {
	try {
		if (valdHlpr.isObjectID(_id)) {
			usrSrv.findUsrById(_id, function (err, res) {
				if (err) {
					return callback(err, null);
				} else {
					return callback(null, res);
				}
			});
		} else {
			return callback(new Error('invalid _id'), null);
		}
	} catch (err) {
		return callback(err, null);
	}
};
/**
 * [insUsr description]
 *
 * @method insUsr
 *
 * @param  {[type]}   usr_obj  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.insUsr = function (usr_obj, callback) {
	try {
		if (usr_obj && Object.keys(usr_obj).length >= 5) {
			var usr = new UsrMdl(usr_obj);
			usr.validate();
			usrSrv.insertUsr(usr, function (err, res) {
				if (err) {
					return callback(err, null);
				} else {
					return callback(null, res);
				}
			});
		} else {
			return callback(new Error('invalid user object'), null);
		}
	} catch (err) {
		return callback(err, null);
	}
};
/**
 * [updOrPatchUsr description]
 *
 * @method updOrPatchUsr
 *
 * @param  {[type]}      usr_obj  [description]
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
exports.updOrPatchUsr = function (usr_obj, callback) {
	try {
		if (usr_obj && valdHlpr.isObjectID(usr_obj._id) && Object.keys(usr_obj).length > 1) {
			usrSrv.findUsrById(usr_obj._id, function (err, usr) {
				if (err) {
					return callback(err, null);
				} else {
					var cnt = 0;
					for (var key in usr_obj) {
						if (usr_obj[key] != usr[key]) {
							usr[key] = usr_obj[key];
							cnt++;
						}
					}
					if (cnt > 0) {
						usr.sanitize();
						usr.validate();
						usrSrv.updateUsrById(usr._id, usr.set(), function (err, res) {
							if (err) {
								return callback(err, null);
							} else {
								return callback(null, usr);
							}
						});
					} else {
						return callback(null, usr);
					}
				}
			});
		} else {
			return callback(new Error('invalid user object'), null);
		}
	} catch (err) {
		return callback(err, null);
	}
};
/**
 * [delUsr description]
 *
 * @method delUsr
 *
 * @param  {[type]}   _id      [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.delUsr = function (_id, callback) {
	try {
		if (valdHlpr.isObjectID(_id)) {
			usrSrv.delUsrById(_id, function (err, res) {
				if (err) {
					return callback(err, null);
				} else {
					return callback(null, true);
				}
			});
		} else {
			return callback(new Error('invalid _id'), null);
		}
	} catch (err) {
		return callback(err, null);
	}
};