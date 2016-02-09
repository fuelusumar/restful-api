var endpointsInit = require('../src/config/initializers/endpoints');
var endptsHelper = require('../src/helpers/endpoints');
console.dir(endptsHelper.getLinks('v1', 'users'));
//console.dir(endptsHelper.getLinks('v1', 'users'));
console.dir(endptsHelper.getLinks('v1', 'friends', true, 'http://api.restful.org'));
//console.dir(endptsHelper.getLinks('v1', 'friends', true, 'http://api.restful.org'));
console.dir(endptsHelper.getLinks('v1', 'friends', true, 'http://api.restful.org', {
	user_id: 16,
	friend_id: 31
}));
//console.dir(
//endptsHelper.getLinks('v1', 'friends', true, 'http://api.restful.org', {
//	user_id: 16,
//	friend_id: 31
//});
//);
console.dir(global.endpoints['v1']['friends']);