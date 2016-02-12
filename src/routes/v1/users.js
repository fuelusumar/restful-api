var express = require('express');
var router = express.Router();
var endptsHlpr = require('../../helpers/endpoints');
var usrCtrl = require('../../controllers/user');
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {Object} next  [description]
 *
 * @return {[type]} [description]
 */
router.get('/users', function (req, res, next) {
	try {
		var query = {};
		var order = {};
		var page = parseInt(req.query.page, 10) || 1;
		order[req.query.order || '_id'] = -1;
		for (var key in req.query) {
			if (key != 'order' && key != 'limit' && key != 'skip' && key != 'axs_key' && key != 'digest' && key != 'page') {
				query[key] = req.query[key];
			}
		}
		usrCtrl.findUsrs(query, page, order, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "list",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next  [description]
 *
 * @return {[type]} [description]
 */
router.get('/users/:user_id', function (req, res, next) {
	try {
		usrCtrl.findUsrById(req.params.user_id, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "retrieve",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next  [description]
 *
 * @return {[type]} [description]
 */
router.post('/users', function (req, res, next) {
	try {
		usrCtrl.insertUsr(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "create",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next  [description]
 *
 * @return {[type]} [description]
 */
router.put('/users/:user_id', function (req, res, next) {
	try {
		usrCtrl.updateOrPatchUsr(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "update",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next  [description]
 *
 * @return {[type]} [description]
 */
router.patch('/users/:user_id', function (req, res, next) {
	try {
		usrCtrl.updateOrPatchUsr(req.body, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "partial",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next  [description]
 *
 * @return {[type]} [description]
 */
router.delete('/users/:user_id', function (req, res, next) {
	try {
		usrCtrl.deleteUsrById(req.params.user_id, function (error, result, status) {
			if (error) {
				next(error);
			} else {
				res.status(status).send({
					action: "delete",
					data: result,
					_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
				});
			}
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next  [description]
 *
 * @return {[type]} [description]
 */
router.options('/users/:user_id', function (req, res, next) {
	try {
		res.status(200).send({
			action: "options",
			_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [description]
 *
 * @method
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next  [description]
 *
 * @return {[type]} [description]
 */
router.options('/users', function (req, res, next) {
	try {
		res.status(200).send({
			action: "options",
			_links: endptsHlpr.loadEnpoints('v1', 'users').getHyper(req.method, req.headers.host, req.originalUrl, req.params)
		});
	} catch (err) {
		next(err);
	}
});
/**
 * [exports description]
 *
 * @type {[type]}
 */
module.exports = router;