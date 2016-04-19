'use strict';

var fs = require('fs'),
  thunkify = require('thunkify'),
  readFile = thunkify(fs.readFile),
  _ = require('underscore');

var allowedPrefix = null;

module.exports = combo;

function combo(_allowedPrefix) {
  if (_.isString(_allowedPrefix)) {
    allowedPrefix = [ _allowedPrefix ];
  }
  allowedPrefix = Array.prototype.slice.call(_allowedPrefix);
  return comboCore;
}

function *comboCore(next) {
  var regex = /combo=[^&]*/,
    comboList = regex.exec(decodeURIComponent(this.querystring));
  
  yield next;

  if (!comboList) {
    return;
  }
  comboList = comboList[0];
  comboList = comboList.slice(comboList.indexOf('=') + 1).split(/\s*,\s*/g);
  this.body = ''; 

  // Cannot use comboList.map here because
  // yield must be used inside generator functions.
  // But this is kind of a murdering functional 
  // programming goodness. Any thoughts?
  var i,
    len = comboList.length,
    allowed;

  for (i = 0; i < len; i ++) {
    allowed = _.reduce(allowedPrefix, function(prev, prefix) {
      return !(/\.\./.test(comboList[i])) && 
        (prev || (new RegExp('^' + prefix.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')).test(comboList[i]));
    }, false);
    if (!allowed) {
      continue;
    }
    try {
      var result = yield readFile(comboList[i]);
      this.body += result + '\n';
    }
    catch (e) {
      console.log('missing file: ' + comboList[i]);
    }
  };
}