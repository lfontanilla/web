/* put controller actions here */

exports.index = function(req, res) {
  res.render('index', {title: 'Home'});
};