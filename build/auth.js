var usrSrv = require('../services/user');
var jwt = require('jsonwebtoken');
/**
 * [getTkn description]
 *
 * @method getTkn
 *
 * @param  {[type]} _usr_id [description]
 * @param  {[type]} usrnm   [description]
 *
 * @return {[type]} [description]
 */
var getTkn = function (_usr_id, usrnm) {
	return jwt.sign({
		_id: _usr_id,
		usr: usrnm
	}, global.security.options.secret, {
		expiresIn: global.security.options.expires_in
	});
};
/**
 * [getToken description]
 *
 * @method getToken
 *
 * @param  {[type]} usr [description]
 *
 * @return {[type]} [description]
 */
exports.getToken = function (_usr_id, usrnm) {
	return getTkn(_usr_id, usrnm);
};
/**
 * [renewToken description]
 *
 * @method renewToken
 *
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 *
 * @return {[type]}   [description]
 */
exports.renewToken = function (req, res, next) {
	var date = new Date();
	var now = Math.floor(date.getTime() / 1000);
	var token = req.headers.authorization.split(" ")[1];
	var decoded = jwt.verify(token, global.security.options.secret);
	if (decoded.exp >= now) {
		req.auth = getTkn(decoded._id, decoded.usr);
		next();
	} else {
		next(new Error('token has expired'));
	}
};