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
	usrDao.findSchemaById(_id, function (err, usr) {
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
	}, function (err, usr) {
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
	}, function (err, usr) {
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
exports.findUsrs = function (query, limit, order, callback) {
	usrDao.findSchemaLst(query, limit, order, function (err, usr) {
		callback(err, usr);
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
	usrDao.findAllSchemaLst(query, order, function (err, usr) {
		callback(err, usr);
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
 * [delAllUsrs description]
 *
 * @method delAllUsrs
 *
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.delAllUsrs = function (callback) {
	usrDao.delAllSchemas(function (err, usr) {
		callback(err, usr);
	});
};
/**
 * [delCompById description]
 *
 * @method delCompById
 *
 * @param  {[type]}    _id      [description]
 * @param  {Function}  callback [description]
 *
 * @return {[type]}    [description]
 */
exports.delUsrById = function (_id, callback) {
	usrDao.delSchemaById(_id, function (err, usr) {
		callback(err, usr);
	});
};