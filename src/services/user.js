var mongoose = require('mongoose');
var Dao = require('../helpers/dao');
var UsrMdl = require('../models/user');
var usrSch = require('../schemas/user');
/**
 * [usrDao description]
 *
 * @type {Dao}
 */
var usrDao = new Dao('Usr', usrSch, UsrMdl);
/**
 * [clnUrLst description]
 *
 * @method clnUrLst
 *
 * @param  {[type]} usrs [description]
 *
 * @return {[type]} [description]
 */
var clnUrLst = function (usrs) {
	if (Array.isArray(usrs) && usrs.length > 0) {
		var _usrs = [];
		for (var i = 0, l = usrs.length; i < l; i++) {
			_usrs.push(usrs[i].show());
		}
		return _usrs;
	}
	return usrs;
};
/**
 * [insertUsr description]
 *
 * @method insertUsr
 *
 * @param  {[type]}   usr_mdl  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.insertUsr = function (usr_mdl, callback) {
	usrDao.insertSchema(usr_mdl, function (err, usr) {
		callback(err, usr);
	});
};
/**
 * [findUsrById description]
 *
 * @method findUsrById
 *
 * @param  {[type]}    _id      [description]
 * @param  {Function}  callback [description]
 *
 * @return {[type]}    [description]
 */
exports.findUsrById = function (_id, callback) {
	usrDao.findSchemaById(_id, null, '', function (err, usr) {
		callback(err, usr);
	});
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
	usrDao.findSchema({
		email: email
	}, null, '', function (err, usr) {
		callback(err, usr);
	});
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
	usrDao.findSchema({
		usrnm: usrnm
	}, null, '', function (err, usr) {
		callback(err, usr);
	});
};
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
exports.findUsrs = function (query, skip, limit, order, callback) {
	usrDao.findSchemaLst(query, '-passwd', skip, limit, order, '', function (err, usrs) {
		callback(err, clnUrLst(usrs));
	});
};
/**
 * [findAllUsrs description]
 *
 * @method findAllUsrs
 *
 * @param  {[type]}    query    [description]
 * @param  {[type]}    order    [description]
 * @param  {Function}  callback [description]
 *
 * @return {[type]}    [description]
 */
exports.findAllUsrs = function (query, order, callback) {
	usrDao.findAllSchemaLst(query, '-passwd', order, '', function (err, usrs) {
		callback(err, clnUrLst(usrs));
	});
};
/**
 * [updateUsrById description]
 *
 * @method updateUsrById
 *
 * @param  {[type]}      _id      [description]
 * @param  {[type]}      set      [description]
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
exports.updateUsrById = function (_id, set, callback) {
	set.upd_at = new mongoose.Types.ObjectId();
	usrDao.updateSchema({
		_id: _id
	}, set, {}, function (err, usr) {
		callback(err, usr);
	});
};
/**
 * [deleteAllUsrs description]
 *
 * @method deleteAllUsrs
 *
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
exports.deleteAllUsrs = function (callback) {
	usrDao.delAllSchemas(function (err, usr) {
		callback(err, usr);
	});
};
/**
 * [deleteUsrById description]
 *
 * @method deleteUsrById
 *
 * @param  {[type]}      _id      [description]
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
exports.deleteUsrById = function (_id, callback) {
	usrDao.delSchemaById(_id, function (err, usr) {
		callback(err, usr);
	});
};