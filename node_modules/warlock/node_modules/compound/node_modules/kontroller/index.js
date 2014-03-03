var fs = require('fs');

exports.BaseController = require('./lib/base');
exports.Helpers = require('./lib/helpers');

exports.getControllerTemplate = function (filename) {
    return fs.readFileSync(__dirname + '/templates/' + filename).toString();
};
