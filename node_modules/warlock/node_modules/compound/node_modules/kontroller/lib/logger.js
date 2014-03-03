
var util = require('util');
var events = require('events');

module.exports = ControllerLogger;

function ControllerLogger(ctl) {
    this.ctl = ctl;
    this.hookStarted = 0;
    this.processingStarted = 0;
}

util.inherits(ControllerLogger, events.EventEmitter);

ControllerLogger.prototype.beforeProcessing = function () {
    this.processingStarted = Date.now();
    this.emit('beforeProcessing', this.ctl);
};

ControllerLogger.prototype.afterProcessing = function () {
    var duration = Date.now() - this.processingStarted;
    this.emit('afterProcessing', this.ctl, duration);
};

ControllerLogger.prototype.beforeHook = function (name) {
    this.hookStarted = Date.now();
    this.emit('beforeHook', this.ctl, name);
};

ControllerLogger.prototype.afterHook = function (name) {
    var duration = Date.now() - this.hookStarted;
    this.emit('afterHook', this.ctl, name, duration);
};

