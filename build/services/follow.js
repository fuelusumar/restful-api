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
 * [clnFlw description]
 *
 * @method clnFlw
 *
 * @param  {[type]} flw [description]
 *
 * @return {[type]} [description]
 */
var clnFlw = function (flw, path) {
	var usrMdl, _flw = {};
	var _path = path.split(' ');
	if (flw && Array.isArray(_path) && _path.length > 0) {
		_flw._id = flw._id;
		_flw._usr = flw._usr;
		_flw._flw = flw._flw;
		_flw.upd_at = flw.upd_at;
		for (var i = _path.length - 1; i >= 0; i--) {
			if (flw[_path[i]]) {
				usrMdl = new UsrMdl();
				usrMdl.init(flw[_path[i]]);
				_flw[_path[i]] = usrMdl.show();
			}
		}
		return _flw;
	}
	return flw;
};
/**
 * [clnFlwLst description]
 *
 * @method clnFlwLst
 *
 * @param  {[type]}  flws [description]
 *
 * @return {[type]}  [description]
 */
var clnFlwLst = function (flws, path) {
	if (Array.isArray(flws) && flws.length > 0) {
		var _flws = [];
		for (var i = 0, l = flws.length; i < l; i++) {
			_flws.push(clnFlw(flws[i], path));
		}
		return _flws;
	}
	return flws;
};
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
		flw = clnFlw(flw, '_usr _flw');
		callback(err, flw);
	});
};
/**
 * [findFlwByUsrIdFlwId description]
 *
 * @method findFlwByUsrIdFlwId
 *
 * @param  {[type]}       email    [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
exports.findFlwByUsrIdFlwId = function (_usr_id, _flw_id, callback) {
	flwDao.findSchema({
		_usr: _usr_id,
		_flw: _flw_id,
	}, '-_flw.passwd -_usr.passdw', '_usr _flw', function (err, flw) {
		flw = clnFlw(flw, '_usr _flw');
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
exports.findFlws = function (query, skip, limit, order, path, callback) {
	flwDao.findSchemaLst(query, '-_flw.passwd -_usr.passdw', skip, limit, order, path, function (err, flws) {
		flws = clnFlwLst(flws, path);
		callback(err, flws);
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
exports.findAllFlws = function (query, order, path, callback) {
	flwDao.findAllSchemaLst(query, '-_flw.passwd -_usr.passdw', order, path, function (err, flws) {
		flws = clnFlwLst(flws, path);
		callback(err, flws);
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