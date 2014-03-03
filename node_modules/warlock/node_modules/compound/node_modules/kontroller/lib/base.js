var vm = require('vm');
var util = require('util');
var fs = require('fs');
var path = require('path');
var ControllerLogger = require('./logger');
var Module = require('module').Module;
module.exports = BaseController;

/**
 * Base class for any controller. It describes common API for controllers.
 *
 * Each instance method could be triggered from controller context (when
 * run in new context). Basically this class describes context, which contains
 * description of controller. This looks pretty tricky, but it helps to write
 * clean and easy to read controller classes without thinking about OOP (in case
 * of running in new context). Alternatively you can use this class as parent
 * for any other class.
 *
 * Example 1. OOP-style
 *
 *     function MyController() {
 *         BaseController.call(this);
 *     }
 *     MyController.prototype.__proto__ = BaseController.prototype;
 *     var ctl = new MyController;
 *     ctl.action('index', function index() {
 *         this.locals.items = [];
 *         this.render();
 *     });
 *     ctl.call('name');
 *
 * Example 2. Functional style
 *
 *     action(function index() {
 *         this.items = [];
 *         render();
 *     });
 *
 */
function BaseController() {
    var ctl = this;

    this.controllerName = this.constructor.controllerName;

    // just declare context things here
    this.context = new ActionContext;
    this.logger = null;
    this.occupied = false;

    this.compiledAction = {};

    ['req', 'res', 'actionName', 'requestedActionName'].forEach(function (key) {
        ctl.__defineGetter__(key, contextGetter(ctl, key));
    });

    ['params', 'session', 'body'].forEach(function (key) {
        ctl.__defineGetter__(key, contextGetter(ctl, 'req', key));
    });

    function contextGetter(ctl, key, subkey) {
        return subkey ?
            function () { return ctl.context[key][subkey]; }:
            function () { return ctl.context[key]; };
    }

    Object.keys(BaseController.extensions).forEach(function (k) {
        ctl[k] = BaseController.extensions[k];
    });

}

function ActionContext() {
    this.req = {};
    this.res = {};
    this.actionName = '';
    this.requestedActionName = '';
    this.outerNext = function () {};
    this.innerNext = function () {};
    this.inAction = false;
}

ActionContext.prototype.apply = function (req, res, next) {
    this.req = req;
    this.res = res;
    this.outerNext = next;
    this.inAction = false;
};

ActionContext.prototype.applyAction = function (name, requestedName, fn) {
    this.actionName = name;
    this.requestedActionName = requestedName;
    this.innerNext = fn;
};

BaseController.route = function (action) {
    var Controller = arguments.callee.caller;
    return function route(req, res, next) {
        (new Controller).perform(action, req, res, next);
    };
};

BaseController.prototype.next = function (err) {
    if (err) {
        this.occupied = false;
        this.context.outerNext(err);
    } else {
        this.context.innerNext();
    }
};

BaseController.extensions = {};

var cache = {};

BaseController.constructClass = function (controllerName, klass) {
    Controller.controllerName = controllerName || 'Controller';
    Controller.filterParams = ['password'];
    function Controller() {
        if (!(this instanceof Controller)) {
            return BaseController.route(arguments[0]);
        }

        BaseController.call(this);
    }
    Controller.prototype.__proto__ = BaseController.prototype;
    BaseController.prototype.reset.call(new Controller, klass);
    // util.inherits(Controller, BaseController);
    return Controller;
};

BaseController.prototype.extendController = function (ctl, Base) {
    util.inherits(ctl.constructor, Base);
    Base.call(ctl, this);
};

BaseController.prototype.reset = function (Klass) {
    var Ctl = this.constructor;
    Ctl.before = [];
    Ctl.after = [];
    if (Klass) {
        this.constructor.actions = new Klass(this);
        setAsAction(this.constructor.actions.__proto__);
    } else {
        this.constructor.actions = {};
    }

    function setAsAction(obj) {
        for (var i in obj) {
            obj[i].isAction = true;
        }
        if (obj.__proto__) setAsAction(obj.__proto__);
    }
};

BaseController.prototype.build = function (script, req) {
    try {
        var f = new Function('context', 'require', 'with (context) { (function () { ' + script + '\n })() }');
        f(this, req ? function (path) {
            return Module._load(path, req);
        } : require);
    } catch (e) {
        console.log('Error in ' + this.controllerName + ' controller');
        throw e;
    }

};

BaseController.prototype.getLogger = function () {
    if (this.logger) {
        return this.logger;
    }
    this.logger = new ControllerLogger(this);
    return this.logger;
};

/**
 * @override default controller string representation
 */
BaseController.prototype.toString = function toString() {
    return 'Controller ' + this.controllerName;
};

extendWith(require('./rendering'));
extendWith(require('./flow-control'));
extendWith(require('./helpers'));
extendWith(require('./code-sharing'));

function extendWith(bc) {
    Object.keys(bc.prototype).forEach(function (meth) {
        BaseController.prototype[meth] = bc.prototype[meth];
    });
}

