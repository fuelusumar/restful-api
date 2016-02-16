var mongoose = require('mongoose');
/**
 * [usrSchema description]
 *
 * @type {[type]}
 */
var usrSchema = mongoose.Schema({
	usrnm: {
		type: String,
		lowercase: true,
		trim: true,
		required: true,
		validate: /^[a-zA-Z][a-zA-Z0-9\._\-]{3,14}?[a-zA-Z0-9]{0,2}$/
	},
	passwd: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		required: true,
		validate: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
	},
	name: {
		type: String,
		trim: true
	},
	avatar_url: {
		type: String,
		trim: true,
		'default': null
	},
	bday: {
		type: Date,
		'default': null
			//'default': new Date()
	},
	sex: {
		type: Number,
		min: 0,
		max: 2,
		'default': 0
	},
	lang: {
		type: String,
		lowercase: true,
		trim: true,
		'default': 'en'
	},
	country: {
		type: String,
		uppercase: true,
		trim: true,
		//'default': null
		'default': 'US'
	},
	is_active: {
		type: Boolean,
		'default': true
	},
	is_private: {
		type: Boolean,
		'default': false
	},
	is_banned: {
		type: Boolean,
		'default': false
	},
	is_verfied: {
		type: Boolean,
		'default': false
	},
	email_verfd: {
		type: Boolean,
		'default': false
	},
	upd_at: {
		type: mongoose.Schema.Types.ObjectId,
		'default': new mongoose.Types.ObjectId()
	}
}, {
	collection: 'usrs',
	autoIndex: false
});
/**
 * [usrnm description]
 *
 * @type {[type]}
 */
usrSchema.index({
	usrnm: 1
}, {
	unique: true
}, {
	name: "usrs_usrnm_uq_indx"
});
/**
 * [email description]
 *
 * @type {[type]}
 */
usrSchema.index({
	email: 1
}, {
	unique: true
}, {
	name: "usrs_email_uq_indx"
});
/**
 * [lang description]
 *
 * @type {number}
 */
usrSchema.index({
	lang: 1,
	country: 1,
	is_active: 1,
	is_private: 1,
	is_banned: 1
}, {
	name: "usrs_cp_indx"
});
//
module.exports = usrSchema;