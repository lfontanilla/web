/* put controller actions here */
var request = require('request');
var common = require('../config/config');
var config = common.config();

exports.search = function(req, res) {
  request(config.apiurl + '/amazonsearch/' + req.params.searchterms, function(error, response, body) {
    var data = {};
    if (!error && response.statusCode == 200)
      data = body;
    res.render('amazonsearch', {title: 'Amazon Search', data: data});
  });
};