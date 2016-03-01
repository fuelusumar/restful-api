var mongoose = require('mongoose');
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
	}
}
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
	this._usr = flwSchema._usr ? flwSchema._usr.toJSON() : null;
	this._flw = flwSchema._flw ? flwSchema._flw.toJSON() : null;
	this.upd_at = flwSchema.upd_at;
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