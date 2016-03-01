var mongoose = require('mongoose');
var Dao = require('../helpers/dao');
var UsrMdl = require('../models/user');
var usrSch = require('../schemas/user');
var FlwMdl = require('../models/follow');
var flwSch = require('../schemas/follow');
/**
 * [usrDao description]
 *
 * @type {Dao}
 */
var flwDao = new Dao('Flw', flwSch, FlwMdl, 'Usr', usrSch, UsrMdl);
/**
 * [insertFlw description]
 *
 * @method insertFlw
 *
 * @param  {[type]}   flw_mdl  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.insertFlw = function (flw_mdl, callback) {
	flwDao.insertSchema(flw_mdl, function (err, flw) {
		callback(err, flw);
	});
};
/**
 * [findFlwById description]
 *
 * @method findFlwById
 *
 * @param  {[type]}    _id      [description]
 * @param  {Function}  callback [description]
 *
 * @return {[type]}    [description]
 */
exports.findFlwById = function (_id, callback) {
	flwDao.findSchemaById(_id, '-_flw.passwd -_usr.passdw', '_usr _flw', function (err, flw) {
		callback(err, flw);
	});
};
/**
 * [findFlwByEmail description]
 *
 * @method findFlwByEmail
 *
 * @param  {[type]}       email    [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
exports.findFlwByUsrId = function (_usr_id, callback) {
	flwDao.findSchema({
		_usr: _usr_id
	}, '-_flw.passwd -_usr.passdw', '_usr _flw', function (err, flw) {
		callback(err, flw);
	});
};
/**
 * [findFlwByFlwnm description]
 *
 * @method findFlwByFlwnm
 *
 * @param  {[type]}       flwnm    [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
exports.findFlwByFlwId = function (_flw_id, callback) {
	flwDao.findSchema({
		_flw: _flw_id
	}, '-_flw.passwd -_usr.passdw', '_usr _flw', function (err, flw) {
		callback(err, flw);
	});
};
/**
 * [findFlws description]
 *
 * @method findFlws
 *
 * @param  {[type]}   query    [description]
 * @param  {[type]}   limit    [description]
 * @param  {[type]}   order    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findFlws = function (query, skip, limit, order, callback) {
	flwDao.findSchemaLst(query, '-_flw.passwd -_usr.passdw', skip, limit, order, '_usr _flw', function (err, flw) {
		callback(err, flw);
	});
};
/**
 * [findAllFlws description]
 *
 * @method findAllFlws
 *
 * @param  {[type]}    query    [description]
 * @param  {[type]}    order    [description]
 * @param  {Function}  callback [description]
 *
 * @return {[type]}    [description]
 */
exports.findAllFlws = function (query, order, callback) {
	flwDao.findAllSchemaLst(query, '-_flw.passwd -_usr.passdw', order, '_usr _flw', function (err, flw) {
		callback(err, flw);
	});
};
/**
 * [deleteAllFlws description]
 *
 * @method deleteAllFlws
 *
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
exports.deleteAllFlws = function (callback) {
	flwDao.delAllSchemas(function (err, flw) {
		callback(err, flw);
	});
};
/**
 * [deleteFlwById description]
 *
 * @method deleteFlwById
 *
 * @param  {[type]}      _id      [description]
 * @param  {Function}    callback [description]
 *
 * @return {[type]}      [description]
 */
exports.deleteFlwById = function (_id, callback) {
	flwDao.delSchemaById(_id, function (err, flw) {
		callback(err, flw);
	});
};