var usrSrv = require('../services/user');
var jwt = require('jsonwebtoken');
/**
 * [getToken description]
 *
 * @method getToken
 *
 * @param  {[type]} usr [description]
 *
 * @return {[type]} [description]
 */
exports.addToken = function (usr) {
	var tkn = jwt.sign({
		_id: usr._id,
		usrnm: usr.usrnm
	}, global.security.options.secret);
	usr.tkn = tkn;
	return usr;
};