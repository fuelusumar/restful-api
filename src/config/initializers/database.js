var environment = process.env.NODE_ENV || 'development';
var database = require('../environments/' + environment + '/database.json');
var winston = require('winston');
// Bring Mongoose into the app 
var mongoose = require('mongoose');
// Build the connection string 
var dbURI = 'mongodb://' + database.server + ':' + database.port + '/' + database.name;
// Create the database connection 
mongoose.connect(dbURI);
// CONNECTION EVENTS 
// When successfully connected 
mongoose.connection.on('connected', function () {
	winston.log('info', 'Mongoose default connection open to %s', dbURI);
});
// If the connection throws an error 
mongoose.connection.on('error', function (err) {
	winston.log('info', 'Mongoose default connection error', err);
});
// When the connection is disconnected 
mongoose.connection.on('disconnected', function () {
	winston.log('info', 'Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		winston.log('info', 'Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});