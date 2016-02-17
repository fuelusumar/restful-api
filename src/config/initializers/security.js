var winston = require('winston');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var environment = process.env.NODE_ENV || 'development';
var security = require('../environments/' + environment + '/security.json');
/**
 * [initSecurity description]
 *
 * @method initSecurity
 *
 * @return {[type]}     [description]
 */
var initSecurity = function () {
	winston.log('info', 'Initialazing security...');
	global.security = security;
};
// action to take when events are emitted
eventEmitter.on('initSecurity', initSecurity);
// events emision
eventEmitter.emit('initSecurity');
process.on('uncaughtException', function (err) {
	winston.log('error', 'Error initialazing security', err);
});