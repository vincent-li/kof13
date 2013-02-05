var fs = require('fs');
var path = require('path');
var Module = require('module');
var vm = require('vm');

function addSpaces(str, len, to_start) {
    var str_len = str.length;
    for (var i = str_len; i < len; i += 1) {
        if (!to_start) {
            str += ' ';
        } else {
            str = ' ' + str;
        }
    }
    return str;
}
exports.addSpaces = addSpaces;

exports.camelize = function (underscored, upcaseFirstLetter) {
    var res = '';
    underscored.split('_').forEach(function (part) {
        res += part[0].toUpperCase() + part.substr(1);
    });
    return upcaseFirstLetter ? res : res[0].toLowerCase() + res.substr(1);
};

var addCoverage = exports.addCoverage = function (code, filename) {
    if (!process.cov) {
        //if (require('fulljslint').jslint(code)) {
        //}
        return code;
    }
    var lines = code.split('\n');

    if (lines.length > 0) {
        lines[0] = 'if (!__cov["' + filename + '"]) {__cov["' + filename + '"] = { 0: true}; }' + lines[0];
    }

    for (var i = 0; i < lines.length; i++) {
        var covLine = ' __cov["' + filename + '"][' + i + '] = true;';
        lines[i] = lines[i]
        .replace(/;$/, ';' + covLine)
        .replace(/^\s*(return|throw|break|continue)/, covLine + ' $1');
    }

    return lines.join('\n');
};
// cache for source code
var cache = {};
// cache for compiled scripts
var scriptCache = {};

function runCode(filename, context) {
    context = context || {};

    var dirname = path.dirname(filename);

    // extend context
    context.require = context.require || function (apath) {
        var isRelative = apath.match(/^\.\.?\//);
        return require(isRelative ? path.resolve(dirname, apath) : apath);
    };
    context.app = app;
    //由于异步特性此处容易出现wapp未定义的情况
    if(typeof wapp !== 'undefined'){
        context.wapp = wapp;
    }
    context.console = console;
    context.setTimeout = setTimeout;
    context.setInterval = setInterval;
    context.clearTimeout = clearTimeout;
    context.clearInterval = clearInterval;
    context.__filename = filename;
    context.__dirname = dirname;
    context.process = process;

    // omit file reading and caching part if we have compiled script
    if (!scriptCache[filename]) {
        cache[filename] = cache[filename] || filename && fs.existsSync(filename) && fs.readFileSync(filename);
        if (!cache[filename]) {
            return;
        }
        var code = cache[filename].toString();
        code = addCoverage(code, filename);
    }

    try {
        var m;
        if (scriptCache[filename]) {
            m = scriptCache[filename];
        } else {
            m = vm.createScript(code.toString('utf8'), filename);
            scriptCache[filename] = m;
        }
        m.runInNewContext(context);
    } catch (e) {
        console.log('Error while executing ' + filename);
        throw e;
    }

    // disable caching in development mode
    if (app.disabled('eval cache')) {
        cache[filename] = null;
        scriptCache[filename] = null;
    }
}
exports.runCode = runCode;

//输出debug信息
exports.debug = function () {
    warlock.logger.write(Array.prototype.join.call(arguments, ' '));
};

// Stylize a string
function stylize(str, style) {
    var styles = {
        'bold'      : [1,  22],
        'italic'    : [3,  23],
        'underline' : [4,  24],
        'cyan'      : [96, 39],
        'blue'      : [34, 39],
        'yellow'    : [33, 39],
        'green'     : [32, 39],
        'red'       : [31, 39],
        'grey'      : [90, 39],
        'green-hi'  : [92, 32],
    };
    return '\033[' + styles[style][0] + 'm' + str +
           '\033[' + styles[style][1] + 'm';
};

var $ = function (str) {
    str = new(String)(str);

    ['bold', 'grey', 'yellow', 'red', 'green', 'cyan', 'blue', 'italic', 'underline'].forEach(function (style) {
        Object.defineProperty(str, style, {
            get: function () {
                return $(stylize(this, style));
            }
        });
    });
    return str;
};
stylize.$ = $;
exports.stylize = stylize;

var safe_merge = exports.safe_merge = function (merge_what) {
    merge_what = merge_what || {};
    Array.prototype.slice.call(arguments).forEach(function (merge_with, i) {
        if (i == 0) return;
        for (var key in merge_with) {
            if (!merge_with.hasOwnProperty(key) || key in merge_what) continue;
            merge_what[key] = merge_with[key];
        }
    });
    return merge_what;
};

exports.existsSync = fs.existsSync || path.existsSync;