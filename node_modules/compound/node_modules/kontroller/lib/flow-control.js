
module.exports = FlowControl;

function FlowControl() {
}

FlowControl.prototype.perform = function perform(actionName, req, res, next) {
    if (this.occupied) {
        throw new Error('Controller is not ready to handle another request');
    }
    var requestedActionName = actionName;
    var actions = this.constructor.actions;
    if (!(actionName in actions) && '__missingAction' in actions) {
        actionName = '__missingAction';
    }
    this.occupied = true;
    this.initialize(req, res, next);
    this.call(actionName, requestedActionName);
};

/**
 * Initialize controller instance before request handling
 *
 * this is a point where controller gives some information from outside env
 * (from router for example)
 *
 * @param {IncomingMessage} req - incoming http request
 * @param {ServerResponse} res - http server response
 * @param {Function} next - called when request could not handled in current action
 */
FlowControl.prototype.initialize = function (req, res, next) {
    this.context.apply(req, res, next);
    this.locals = {};
};

/**
 * Internal request handler. Serves request using railway env:
 *
 * - run before hooks
 * - run action
 * - run after hooks
 *
 * @param {String} actionName
 */
FlowControl.prototype.call = function call(actionName, requestedActionName) {
    var f, ctl = this, prevHook, index = 0;

    if (f = this.compiledAction[actionName]) {
        return f();
    }

    // handling request queue
    var queue = [];
    // index for tracking uniqueness of hooks by name
    var hookDone = [];

    if (ctl.logger) {
        queue.push(function () {
            ctl.logger.beforeProcessing();
            run();
        });
    }

    var action = this.constructor.actions[actionName];
    if (!action) {
        enqueue([[function (c) {
            return c.next(new Error('Undefined action ' + c.controllerName + '#' + c.actionName + '(' + c.req.url + ')'));
        }, null, actionName]]);
    } else {

        enqueue(this.constructor.before);
        enqueue([[action, null, actionName]]);
        enqueue(this.constructor.after);
    }

    // if (ctl.logger) {
        // queue.push(function () {
            // ctl.logger.afterProcessing();
            // run();
        // });
    // }

    this.context.innerNext = run;

    var len = queue.length;

    this.compiledAction[actionName] = function () {
        ctl.context.applyAction(actionName, requestedActionName, run);
        index = 0;
        run();
    };

    this.call(actionName);

    function run() {
        if (ctl.logger && prevHook) {
            // log afterHook
            ctl.logger.afterHook(prevHook);
            prevHook = '';
        }
        if (index < len) {
            try {
                queue[index++]();
            } catch (e) {
                if (ctl.context.inAction) {
                    e.message += ' in ' + ctl.controllerName +
                    ' controller during "' + actionName + '" action';
                } else {
                    e.message += ' in ' + ctl.controllerName +
                    ' controller during "' + prevHook + '" hook';
                }
                ctl.context.outerNext(e);
            }
        } else {
            ctl.occupied = false;
            if (typeof ctl.context.outerNext === 'function') {
                ctl.context.outerNext();
            }
        }
    }

    function enqueue(collection) {
        collection.forEach(function (f) {
            var fn = f[0];
            if (!fn) {
                throw new Error('Trying to queue undefined function');
            }
            var params = f[1];
            var hookName = f[2];
            if (!params) {
                ok();
            } else if (params.only && params.only.indexOf(actionName) !== -1 && (!params.except || params.except.indexOf(actionName) === -1)) {
                ok();
            } else if (params.except && params.except.indexOf(actionName) === -1) {
                ok();
            }

            function ok() {
                if (hookName) {
                    if (hookDone.indexOf(hookName) !== -1) return;
                    hookDone.push(hookName);
                }

                if (ctl.logger) {
                    // log beforeHook and perform action
                    queue.push(function () {
                        ctl.logger.beforeHook(hookName);
                        prevHook = hookName;
                        ctl.context.inAction = fn.isAction;
                        fn.call(ctl.locals, ctl);
                    });
                } else {
                    // just do action
                    queue.push(function () {
                        ctl.context.inAction = fn.isAction;
                        prevHook = hookName;
                        fn.call(ctl.locals, ctl);
                    });
                }

            }

        });
    }

};

/**
 * Define controller action
 *
 * @param name String - optional (if missed, named function required as first param)
 * @param action Function - required, should be named function if first arg missed
 *
 * @example
 * ```
 * action(function index() {
 *     Post.all(function (err, posts) {
 *         render({posts: posts});
 *     });
 * });
 * ```
 *
 */
FlowControl.prototype.action = function action(name, fn) {
    if (typeof name === 'function') {
        fn = name;
        name = fn.name;
        if (!name) {
            throw new Error('Named function required when `name` param omitted');
        }
    }
    fn.isAction = true;
    fn.customName = name;
    this.constructor.actions[name] = fn;
};

/**
 * Schedule before hook to the end of queue. This method can be called
 * with named function as single param, or with two params: name and 
 * anonimous function
 *
 * Examples:
 * ```
 * before('some named hook', function () {});
 * before(function namedMethod() {});
 * ```
 *
 * This hooks can be skipped using this names in future. Examples:
 * ```
 * skipBefore('some named hook');
 * skipBefore('namedMethod');
 * ```
 *
 * Please note, that every named hook only can be scheduled once:
 * ```
 * before(function myMethod() {
 *     // some code
 * });
 * before(function myMethod() {
 *     // another code
 * });
 * ```
 * This will only schedule first method!
 *
 * @param {Function} f
 * @param {Object} params
 */
FlowControl.prototype.before = function before(f, params) {
    this.constructor.before.push(filter(arguments));
};

/**
 * Schedule hook to the end of 'after'-queue
 *
 * @param {Function} f
 * @param {Object} params
 */
FlowControl.prototype.after = function after(f, params) {
    this.constructor.after.push(filter(arguments));
};

/**
 * Schedule before hook to the start of queue. This method can be called
 * with named function as single param, or with two params: name and
 * anonimous function.
 *
 * @alias prependBeforeFilter
 * @param {Function} f
 * @param {Object} params
 */
FlowControl.prototype.prependBefore = function prependBefore(f, params) {
    this.constructor.before.unshift(filter(arguments));
};

/**
 * @param {String} name - name of hook to skip
 * @param {Array} or {String} only - choose actions to skip hook
 */
FlowControl.prototype.skipBefore = function (name, only) {
    this.constructor.before.forEach(function (hook, i) {
        if (hook[0] && hook[0].customName && name === hook[0].customName) {
            skipFilter(this.constructor.before, i, only ? only.only : null);
        }
    }.bind(this));
};

/**
 * @param {String} name - name of hook to skip
 * @param {Array} or {String} only - choose actions to skip hook
 */
FlowControl.prototype.skipAfter = function (name, only) {
    this.constructor.after.forEach(function (hook, i) {
        if (hook[0] && hook[0].customName && name === hook[0].customName) {
            skipFilter(this.constructor.after, i, only ? only.only : null);
        }
    }.bind(this));
};

/**
 * @param {Array} hooks collection
 * @param {Number} index of hook to skip
 * @param {Array} or {String} only - choose actions to skip hook
 * @private
 */
function skipFilter(hooks, index, only) {
    if (!only) {
        delete hooks[index];
    } else if (hooks[index][0]) {
        if (!hooks[index][1]) {
            hooks[index][1] = {except: []};
        }
        if (!hooks[index][1].except) {
            hooks[index][1].except = [];
        } else if (typeof hooks[index][1].except === 'string') {
            hooks[index][1].except = [hooks[index][1].except];
        }
        if (typeof only === 'string') {
            hooks[index][1].except.push(only);
        } else if (only && only.constructor.name === 'Array') {
            only.forEach(function (name) {
                hooks[index][1].except.push(name);
            });
        }
    }
}

function filter(args) {
    if (typeof args[0] === 'string' && typeof args[1] === 'function') {
        // change order
        args[1].customName = args[0];
        return [args[1], args[2], args[0]];
    } else {
        // normal order
        args[0].customName = args[0].name;
        return [args[0], args[1], args[0].name];
    }
}

/**
 * @param {String} name - name of action
 * @returns whether controller responds to action
 */
FlowControl.prototype.respondsTo = function respondTo(name) {
    return typeof this.constructor.actions[name] == 'function';
};

