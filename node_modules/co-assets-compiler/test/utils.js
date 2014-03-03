var fs = require('fs')
  , path = require('path');

function ensureDirClean(dir) {
  var exists = fs.existsSync(dir);
  if (exists) {
    var files = fs.readdirSync(dir);
    files.filter(function (file) {
      return file.substr(0, 1) !== '.'
    }).map(function(file) {
      return path.join(dir, file);
    }).forEach(fs.unlinkSync);
  } else {
    fs.mkdirSync(dir, 0755);
  }
};
exports.ensureDirClean = ensureDirClean;

function invalidateRequireCache() {
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key];
  });
};
exports.invalidateRequireCache = invalidateRequireCache;