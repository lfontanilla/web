/*
 * Module dependencies
 */
var express = require('express')
        , stylus = require('stylus')
        , nib = require('nib');
var common = require('./config/config');
var config = common.config();
var port = process.env.PORT || config.port;

var app = module.exports = express();

function compile(str, path) {
  return stylus(str)
          .set('filename', path)
          .use(nib());
}

// Configuration, defaults to jade as the view engine
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware(
          {src: __dirname + '/public'
                    , compile: compile
          }
  ));
  app.use(express.static(__dirname + '/public'));
});

app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode, THIS IS THE WEB", port, app.settings.env);
});

/*
 * Exports the express app for other modules to use
 * all route matches go the routes.js file
 */
module.exports.app = app;
routes = require('./routes');