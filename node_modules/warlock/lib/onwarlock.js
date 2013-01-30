var fs = require('fs');
var path = require('path');

function Warlock() {
    global.warlock    = this;
    this.tools        = require('./tools');
    this.utils        = require('./utils');
    this.generators   = require('./generators');
    this.logger       = require('./logger');
}

try {
    if (process.versions.node < '0.6') {
        Warlock.prototype.version = JSON.parse(fs.readFileSync(__dirname + '/../package.json')).version;
    } else {
        Warlock.prototype.version = require('../package').version;
    }
}catch(e){}

exports.initSystem = function (options) {
    console.log('init system >>>>>>');
    //创建系统对象;
    new Warlock();
    require('./httpserver').createServer();
    require('./websocketserver').initWebsocket();
    return app;
}