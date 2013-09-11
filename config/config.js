var env = require('./env.json');

exports.config = function() {
  console.log(process.env.NODE_ENV);
  var node_env = process.env.NODE_ENV || 'development';
  return env[node_env];
};