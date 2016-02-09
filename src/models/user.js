var mongoose = require('mongoose');
var inspector = require('schema-inspector');
/**
 * [sanitization description]
 *
 * @type {Object}
 */
var sanitization = {
	// You can edit the sanitization too
	type: "UsrMdl",
	properties: {
		usrnm: {
			type: "string",
			rules: ["trim", "lower"]
		},
		passwd: {
			type: "string",
			rules: ["trim"]
		},
		email: {
			type: "string",
			rules: ["trim", "lower"]
		},
		name: {
			type: "string",
			rules: ["trim", "title"]
		},
		avatar_url: {
			type: "string",
			rules: ["trim"]
		}
	}
};
/**
 * [validation description]
 *
 * @type {Object}
 */
var validation = {
	// And the validation!
	type: "UsrMdl",
	properties: {
		usrnm: {
			type: "string",
			minLength: 1
		},
		passwd: {
			type: "string",
			minLength: 1
		},
		email: {
			type: "string",
			minLength: 1,
			pattern: 'email'
		},
		name: {
			type: "string",
			minLength: 1
		},
		avatar_url: {
			type: "string",
			minLength: 1
		}
	}
};
/**
 * [UsrMdl description]
 *
 * @method UsrMdl
 *
 * @param  {[type]} usrnm      [description]
 * @param  {[type]} email      [description]
 * @param  {[type]} name       [description]
 * @param  {[type]} avatar_url [description]
 */
function UsrMdl(usrnm, passwd, email, name, avatar_url) {
	this.usrnm = usrnm;
	this.passwd = passwd;
	this.email = email;
	this.name = name;
	this.avatar_url = avatar_url;
	this.bday = null;
	this.sex = null;
	this.lang = null;
	this.country = null;
	this.is_active = true;
	this.is_private = false;
	this.is_banned = false;
	this.is_verfied = false;
	this.email_verfd = false;
	this.upd_at = new mongoose.Types.ObjectId();
	inspector.sanitize(sanitization, this);
	var inspect = inspector.validate(validation, this);
	if (!inspect.valid) {
		throw new Error(inspect.format());
	}
}
/**
 * [init description]
 *
 * @method init
 *
 * @param  {[type]} usrSchema [description]
 *
 * @return {[type]} [description]
 */
UsrMdl.prototype.init = function (usrSchema) {
	this._id = usrSchema._id;
	this.usrnm = usrSchema.usrnm;
	this.passwd = usrSchema.passwd;
	this.email = usrSchema.email;
	this.name = usrSchema.name;
	this.avatar_url = usrSchema.avatar_url;
	this.bday = usrSchema.bday;
	this.sex = usrSchema.sex;
	this.lang = usrSchema.lang;
	this.country = usrSchema.country;
	this.is_active = usrSchema.is_active;
	this.is_private = usrSchema.is_private;
	this.is_banned = usrSchema.is_banned;
	this.is_verfied = usrSchema.is_verfied;
	this.email_verfd = usrSchema.email_verfd;
	this.upd_at = usrSchema.upd_at;
};
/**
 * [show description]
 *
 * @method show
 *
 * @return {[type]} [description]
 */
UsrMdl.prototype.show = function () {
	var usr = {};
	usr._id = this._id;
	usr.usrnm = this.usrnm;
	//usr.passwd = this.passwd;
	usr.email = this.email;
	usr.name = this.name;
	usr.avatar_url = this.avatar_url;
	usr.bday = this.bday;
	usr.sex = this.sex;
	usr.lang = this.lang;
	usr.country = this.country;
	//usr.is_active = this.is_active;
	//usr.is_private = this.is_private;
	//usr.is_banned = this.is_banned;
	//usr.is_verfied = this.is_verfied;
	//usr.email_verfd = this.email_verfd;
	usr.upd_at = this.upd_at;
	return usr;
};
/**
 * [getAge description]
 *
 * @method getAge
 *
 * @return {[type]} [description]
 */
UsrMdl.prototype.getAge = function () {
	if (this.bday) {
		var diff = new Date() - this.bday;
		var diffdays = diff / 1000 / (60 * 60 * 24);
		var age = Math.floor(diffdays / 365.25);
		return age;
	}
	return null;
};
/**
 * [setUpdate description]
 *
 * @method setUpdate
 */
UsrMdl.prototype.setUpdate = function () {
	this.upd_at = new mongoose.Types.ObjectId();
};
// export the class
module.exports = UsrMdl;