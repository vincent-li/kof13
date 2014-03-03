var crypto = require('crypto');

module.exports = Helpers;

function Helpers() {
}

Helpers.respondToFormats = ['json', 'html', 'xml'];

/**
 * Respond to .:format
 * @param {Function} block
 *
 * Example (respond to json and html):
 *
 *     action(function index() {
 *         var fruits = this.fruits = ['apple', 'banana', 'kiwi'];
 *         respondTo(function (format) {
 *             format.html(render);
 *             format.json(function () {
 *                 send(fruits);
 *             });
 *         });
 *     });
 *
 * To extend list of formats use:
 *
 *     require('kontroller').Helpers.respondToFormats.push('gif', 'png', 'jpg');
 */
Helpers.prototype.respondTo = function respondTo(block) {
    var f = this.params.format || 'html';
    var variants = {};

    Helpers.respondToFormats.forEach(function (format) {
        variants[format] = responderFor(format);
    });

    block(variants);

    function responderFor(format) {
        return function (c) {
            if (f === format) {
                c();
            }
        }
    }
};

/**
 * Enables CSRF Protection
 *
 * This filter will check `authenticity_token` param of POST request 
 * and compare with token calculated by session token and app-wide secret
 *
 * @param {String} secret
 * @param {String} paramName
 *
 * @example `app/controllers/application_controller.js`
 * ```
 * before('protect from forgery', function () {
 *     protectFromForgery('415858f8c3f63ba98546437f03b5a9a4ddea301f');
 * });
 * ```
 */
Helpers.prototype.protectFromForgery = function protectFromForgery(secret, paramName) {
    var req = this.req;

    if (!req.session) {
        return this.next();
    }

    if (!req.session.csrfToken) {
        req.session.csrfToken = Math.random();
        req.csrfParam = paramName || 'authenticity_token';
        req.csrfToken = sign(req.session.csrfToken);
        return this.next();
    }

    // publish secure credentials
    req.csrfParam = paramName || 'authenticity_token';
    req.csrfToken = sign(req.session.csrfToken);

    if (['HEAD', 'GET', 'OPTIONS'].indexOf(req.originalMethod) === -1) {
        var token = req.param(req.csrfParam) || req.header("X-CSRF-Token");
        if (!token || token !== sign(req.session.csrfToken)) {
            console.log('Incorrect authenticity token');
            this.send(403);
        } else {
            this.next();
        }
    } else {
        this.next();
    }

    function sign(n) {
        return crypto.createHash('sha1').update(n.toString()).update(secret.toString()).digest('hex');
    }
};

Helpers.prototype.protectedFromForgery = function () {
    return this.req.csrfToken && this.req.csrfParam;
};

/**
 * Add flash error to display in next request
 *
 * @param {String} type
 * @param {String} message
 */
Helpers.prototype.flash = function flash(type, msg) {
    var msgs = this.session.flash = this.session.flash || {};
    return (msgs[type] = msgs[type] || []).push(msg);
};

/**
 * Send response, as described in ExpressJS guide:
 *
 * This method is a high level response utility allowing you
 * to pass objects to respond with json, strings for html,
 * Buffer instances, or numbers representing the status code.
 * The following are all valid uses:
 * ```
 * send(); // 204
 * send(new Buffer('wahoo'));
 * send({ some: 'json' });
 * send('&lt;p>some html&lt;/p>');
 * send('Sorry, cant find that', 404);
 * send('text', { 'Content-Type': 'text/plain' }, 201);
 * send(404);
 * ```
 *
 */
Helpers.prototype.send = function (x) {
    // log('Send to client: ' + x);
    this.res.send.apply(this.res, Array.prototype.slice.call(arguments));
    if (this.context.inAction) this.next();
};

/**
 * Set or get response header
 *
 * @param {String} key - name of header
 * @param {String} val - value of header (optional)
 *
 * When second argument is omitted method acts as getter.
 *
 * Example:
 * ```
 * header('Content-Length');
 * // => undefined
 *
 * header('Content-Length', 123);
 * // => 123
 * 
 * header('Content-Length');
 * // => 123
 * ```
 */
Helpers.prototype.header = function (key, val) {
    return this.res.header.call(this.res, key, val);
};

/**
 * Redirect to `path`
 */
Helpers.prototype.redirect = function (path) {
    // log('Redirected to', $(path).grey);
    this.res.redirect(path.toString());
    if (this.context.inAction) this.next();
};

/**
 * Configure which query params should be filtered from logging
 * @param {String} param 1 name
 * @param {String} param 2 name
 * @param ...
 * @param {String} param n name
 */
Helpers.prototype.filterParameterLogging = function filterParameterLogging() {
    this.constructor.filterParams = (this.constructor.filterParams || []).concat(Array.prototype.slice.call(arguments));
};
