/* put controller actions here */

exports.search = function(req, res) {
  res.render('amazonsearch', {title: 'Amazon Search'});
};