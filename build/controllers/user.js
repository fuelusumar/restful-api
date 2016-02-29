var valdHlpr = require('../helpers/validate');
var usrSrv = require('../services/user');
var UsrMdl = require('../models/user');
/**
 * [findUsrs description]
 *
 * @method findUsrs
 *
 * @param  {[type]}   query    [description]
 * @param  {[type]}   limit    [description]
 * @param  {[type]}   order    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findUsrs = function (query, page, order, callback) {
	try {
		var skip = (page - 1) * 100;
		var limit = 100;
		query.is_active = true;
		query.is_banned = false;
		usrSrv.findUsrs(query, skip, limit, order, function (err, usr) {
			if (err) {
				return callback(err, null, 500);
			}
			return callback(null, usr, 200);
		});
	} catch (err) {
		return callback(err, null, 500);
	}
};
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
		if (!valdHlpr.isEmail(email)) {
			return callback(Error('invalid email'), null, 400);
		} else {
			usrSrv.findUsrByEmail(email, function (err, usr) {
				if (err) {
					return callback(err, null, 500);
				}
				return callback(null, usr, 200);
			});
		}
	} catch (err) {
		return callback(err, null, 500);
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
		if (!valdHlpr.isUsrnm(usrnm)) {
			return callback(Error('invalid username'), null, 400);
		} else {
			usrSrv.findUsrByUsrnm(usrnm, function (err, usr) {
				if (err) {
					return callback(err, null, 500);
				}
				return callback(null, usr, 200);
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};
/**
 * [findUsrById description]
 *
 * @method findUsrById
 *
 * @param  {[type]}   _id      [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findUsrById = function (_id, callback) {
	try {
		if (!valdHlpr.isObjectID(_id)) {
			return callback(Error('invalid user id'), null, 400);
		} else {
			usrSrv.findUsrById(_id, function (err, res) {
				if (err) {
					return callback(err, null, 500);
				} else {
					return callback(null, res, 200);
				}
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};
/**
 * [insertUsr description]
 *
 * @method insertUsr
 *
 * @param  {[type]}   usr_obj  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.insertUsr = function (usr_obj, callback) {
	try {
		if (!usr_obj || Object.keys(usr_obj).length < 5) {
			return callback(Error('invalid user object or not enough parameters'), null, 400);
		} else {
			var usr = new UsrMdl(usr_obj);
			usr.validate();
			usrSrv.insertUsr(usr, function (err, res) {
				if (err) {
					return callback(err, null, 500);
				} else {
					return callback(null, res, 201);
				}
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};
/**
 * [updateOrPatchUsr description]
 *
 * @method updateOrPatchUsr
 *
 * @param  {[type]}      usr_obj  [description]
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
exports.updateOrPatchUsr = function (usr_obj, callback) {
	try {
		if (!usr_obj || Object.keys(usr_obj).length < 2) {
			return callback(Error('invalid user object or not enough parameters'), null, 400);
		} else if (!valdHlpr.isObjectID(usr_obj._id)) {
			return callback(Error('invalid user id'), null, 400);
		} else {
			usrSrv.findUsrById(usr_obj._id, function (err, usr) {
				if (err) {
					return callback(err, null, 500);
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
								return callback(err, null, 500);
							} else {
								return callback(null, usr, 200);
							}
						});
					} else {
						return callback(null, usr, 304);
					}
				}
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};
/**
 * [deleteUsrById description]
 *
 * @method deleteUsrById
 *
 * @param  {[type]}   _id      [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.deleteUsrById = function (_id, callback) {
	try {
		if (!valdHlpr.isObjectID(_id)) {
			return callback(Error('invalid user id'), null, 400);
		} else {
			usrSrv.deleteUsrById(_id, function (err, res) {
				if (err) {
					return callback(err, null, 500);
				} else {
					return callback(null, true, 204);
				}
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};