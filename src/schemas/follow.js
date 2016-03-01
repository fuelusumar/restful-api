var mongoose = require('mongoose');
/**
 * [flwSchema description]
 *
 * @type {[type]}
 */
var flwSchema = mongoose.Schema({
	_usr: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Usr'
	},
	_flw: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Usr'
	},
	upd_at: {
		type: mongoose.Schema.Types.ObjectId,
		'default': new mongoose.Types.ObjectId()
	}
}, {
	collection: 'flws',
	autoIndex: false
});
/**
 * [flwnm description]
 *
 * @type {[type]}
 */
flwSchema.index({
	_usr: 1,
	_flw: 1
}, {
	unique: true
}, {
	name: "flws_uq_indx"
});
//
module.exports = flwSchema;