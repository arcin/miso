var logger = require('./logger');

function generalResponseHandler (res, customHandler) {
  if (res.statusCode && res.statusCode < 500 && res.statusCode >= 400) {
    logger.error(res.headers.status);
  }
  customHandler(res);
}

// project information
var project = {};
project.Version   = require('../package.json').version;
project.UserAgent = 'miso/' + project.Version;


module.exports.generalResponseHandler = generalResponseHandler;
module.exports.project = project;
