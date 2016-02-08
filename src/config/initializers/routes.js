var winston = require('winston');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var environment = process.env.NODE_ENV || 'development';
var routes = require('../environments/' + environment + '/routes.json');
var versions = routes.versions;
var endpoints = [];
/**
 * [getRoute description]
 *
 * @method getRoute
 *
 * @param  {[type]} action     [description]
 * @param  {[type]} method     [description]
 * @param  {[type]} base       [description]
 * @param  {[type]} controller [description]
 * @param  {[type]} id         [description]
 *
 * @return {[type]} [description]
 */
var getRoute = function (action, method, base, controller, id) {
	var head = base + '/' + controller;
	var tail = id ? '/:' + id : '';
	var link = {
		'method': method,
		'href': head + tail,
		'rel': action
	};
	return link;
};
/**
 * [getVersionRoutes description]
 *
 * @method getVersionRoutes
 *
 * @param  {[type]}         version [description]
 *
 * @return {[type]}         [description]
 */
var getVersionRoutes = function (version) {
	var controllers = version.controllers;
	var base = '/' + version.name;
	var actions = [{
		'method': 'OPTIONS',
		'action': 'links',
		'id': false
	}];
	endpoints[version.name] = [];
	for (var i = 0; i < controllers.length; i++) {
		getControllerRoutes(base, version, controllers[i]);
	}
};
/**
 * [getControllerRoutes description]
 *
 * @method getControllerRoutes
 *
 * @param  {[type]}            base       [description]
 * @param  {[type]}            version    [description]
 * @param  {[type]}            controller [description]
 *
 * @return {[type]}            [description]
 */
var getControllerRoutes = function (base, version, controller) {
	var controllers = controller.controllers || null;
	var actions = version.actions;
	endpoints[version.name][controller.name] = [];
	for (var i = 0; i < actions.length; i++) {
		var action = actions[i];
		endpoints[version.name][controller.name].push(getRoute(action.name, action.method, base, controller.name, action.id ? controller.id : null));
	}
	if (controllers && controllers.length > 0) {
		base += '/' + controller.name + '/:' + controller.id;
		for (var i = 0; i < controllers.length; i++) {
			getControllerRoutes(base, version, controllers[i])
		}
	}
};
/**
 * [initRoutes description]
 *
 * @method initRoutes
 *
 * @return {[type]}   [description]
 */
var initRoutes = function () {
	for (var i = 0; i < versions.length; i++) {
		getVersionRoutes(versions[i]);
	}
	global.endpoints = endpoints;
	console.dir(global.endpoints);
};
// action to take when events are emitted
eventEmitter.on('initRoutes', initRoutes);
// events emision
eventEmitter.emit('initRoutes');
process.on('uncaughtException', function (err) {
	winston.log('error', 'Error initialazing routes', err);
});