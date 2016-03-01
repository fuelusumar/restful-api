var valdHlpr = require('../helpers/validate');
var flwSrv = require('../services/follow');
var FlwMdl = require('../models/follow');
/**
 * [findFlws description]
 *
 * @method findFlws
 *
 * @param  {[type]}   _usr_id  [description]
 * @param  {[type]}   page     [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findFlws = function (_usr_id, page, callback) {
	try {
		if (!valdHlpr.isObjectID(_usr_id)) {
			return callback(Error('invalid user id'), null, 400);
		} else {
			var skip = (page - 1) * 100;
			var limit = 100;
			flwSrv.findFlws({
				_usr: _usr_id
			}, skip, limit, {
				_flw: -1
			}, '_flw', function (err, flws) {
				if (err) {
					return callback(err, null, 500);
				}
				return callback(null, flws, 200);
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};
/**
 * [findFlwsMe description]
 *
 * @method findFlwsMe
 *
 * @param  {[type]}   _usr_id  [description]
 * @param  {[type]}   page     [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findFlwsMe = function (_usr_id, page, callback) {
	try {
		if (!valdHlpr.isObjectID(_usr_id)) {
			return callback(Error('invalid user id'), null, 400);
		} else {
			var skip = (page - 1) * 100;
			var limit = 100;
			flwSrv.findFlws({
				_flw: _usr_id
			}, skip, limit, {
				_usr: -1
			}, '_usr', function (err, flws) {
				if (err) {
					return callback(err, null, 500);
				}
				return callback(null, flws, 200);
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
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
	try {
		if (!valdHlpr.isObjectID(_id)) {
			return callback(Error('invalid follow id'), null, 400);
		} else {
			flwSrv.findFlwById(_id, function (err, res) {
				if (err) {
					return callback(err, null, 500);
				} else {
					return callback(null, res.show(), 200);
				}
			});
		}
	} catch (err) {
		return callback(err, null, 500);
	}
};
/**
 * [insertFlw description]
 *
 * @method insertFlw
 *
 * @param  {[type]}   flw_obj  [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.insertFlw = function (flw_obj, callback) {
	try {
		if (!flw_obj || Object.keys(flw_obj).length < 2) {
			return callback(Error('invalid follow object or not enough parameters'), null, 400);
		} else {
			var flw = new FlwMdl(flw_obj);
			flwSrv.insertFlw(flw, function (err, res) {
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
	try {
		if (!valdHlpr.isObjectID(_id)) {
			return callback(Error('invalid follow id'), null, 400);
		} else {
			flwSrv.deleteFlwById(_id, function (err, res) {
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