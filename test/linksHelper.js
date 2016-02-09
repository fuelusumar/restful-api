var routesInit = require('../src/config/initializers/routes');
var linksHelper = require('../src/helpers/links');
console.dir(linksHelper.getLinks('v1', 'users'));
//console.dir(linksHelper.getLinks('v1', 'users'));
console.dir(linksHelper.getLinks('v1', 'friends', true, 'http://api.restful.org'));
//console.dir(linksHelper.getLinks('v1', 'friends', true, 'http://api.restful.org'));
console.dir(linksHelper.getLinks('v1', 'friends', true, 'http://api.restful.org', {
	user_id: 16,
	friend_id: 31
}));
//console.dir(
//linksHelper.getLinks('v1', 'friends', true, 'http://api.restful.org', {
//	user_id: 16,
//	friend_id: 31
//});
//);
console.dir(global.endpoints['v1']['friends']);