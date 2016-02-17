var usrSrv = require('../services/user');
var jwt = require('jsonwebtoken');
/**
 * [doLogin description]
 *
 * @method doLogin
 *
 * @param  {[type]}   usr      [description]
 * @param  {[type]}   login    [description]
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.doLogin = function (usr, login, callback) {
	if (usr.usrnm == login.usrnm || usr.email == login.usrnm) {
		if (login.passwd == usr.passwd) {
			usrSrv.updateUsrById(usr._id, {
				is_active: true
			}, function (err, res) {
				if (err) {
					return callback(err, null, 500);
				} else {
					return callback(null, usr, 200);
				}
			});
		} else {
			return callback(new Error('invalid password'), null, 400);
		}
	} else {
		return callback(new Error('invalid username or email'), null, 400);
	}
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
exports.addToken = function (usr) {
	var tkn = jwt.sign({
		_id: usr._id,
		usrnm: usr.usrnm
	}, global.security.options.secret);
	usr.tkn = tkn;
	return usr;
};