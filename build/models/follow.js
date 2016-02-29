var mongoose = require('mongoose');
var inspector = require('schema-inspector');
/**
 * [sanitization description]
 *
 * @type {Object}
 */
var sanitization = {
	// You can edit the sanitization too
	type: "FlwMdl",
	properties: {
		_usr: {
			type: "string",
			rules: ["trim"]
		},
		_flw: {
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
	type: "FlwMdl",
	properties: {
		_usr: {
			type: "string",
			minLength: 12,
			maxLength: 24
		},
		_flw: {
			type: "string",
			minLength: 12,
			maxLength: 24
		}
	}
};
/**
 * [FlwMdl description]
 *
 * @method FlwMdl
 *
 * @param  {[type]} flwObj [description]
 */
function FlwMdl(flwObj) {
	if (flwObj) {
		this._usr = flwObj._usr || null;
		this._flw = flwObj._flw || null;
		this.upd_at = new mongoose.Types.ObjectId();
		inspector.sanitize(sanitization, this);
	}
}
/**
 * [validate description]
 *
 * @method validate
 *
 * @return {[type]} [description]
 */
FlwMdl.prototype.validate = function () {
	var inspect = inspector.validate(validation, this);
	if (!inspect.valid) {
		throw new Error(inspect.format());
	}
};
/**
 * [sanitize description]
 *
 * @method sanitize
 *
 * @return {[type]} [description]
 */
FlwMdl.prototype.sanitize = function () {
	inspector.sanitize(sanitization, this);
};
/**
 * [init description]
 *
 * @method init
 *
 * @param  {[type]} flwSchema [description]
 *
 * @return {[type]} [description]
 */
FlwMdl.prototype.init = function (flwSchema) {
	this._id = flwSchema._id;
	this._usr = flwSchema._usr;
	this._flw = flwSchema._flw;
	this.upd_at = flwSchema.upd_at;
	inspector.sanitize(sanitization, this);
};
/**
 * [setUpdate description]
 *
 * @method setUpdate
 */
FlwMdl.prototype.setUpdate = function () {
	this.upd_at = new mongoose.Types.ObjectId();
};
// export the class
module.exports = FlwMdl;