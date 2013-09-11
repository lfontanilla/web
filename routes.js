/* This file maps your route matches
 * to functions defined in various
 * controller classes
 */
app = module.parent.exports.app;

/* require your controllers here */
var siteController = require('./controllers/site');
var amazonController = require('./controllers/amazon');

/* Put routes here */

// main site routes
app.get('/', siteController.index);

// amazon routes
app.get('/amazonsearch/:searchterms', amazonController.search);

