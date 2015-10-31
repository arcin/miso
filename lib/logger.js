var chalk = require('chalk');

var symbolEncodings = {
  checkMark: '\u2733'
}
function logSuccess (msg) {
  console.log(chalk.gray('Success:'), chalk.green(msg));
}

function logError (msg) {
  console.log(chalk.gray('Error:'), chalk.red(msg));
}

function logMisc (msg) {
  console.log(chalk.cyan(msg));
}

function logResult (msg) {
 console.log(chalk.gray(symbolEncodings.checkMark), chalk.green(msg));
}

module.exports = {
  success: logSuccess,
  error: logError,
  misc: logMisc,
  result: logResult
};
