var util = require('util');

var colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
};

var colorNames = Object.keys(colors);

exports.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    'regexp': 'red'
};

function stylize(str, styleType) {
    var style = exports.styles[styleType];

    if (style) {
        return colorize(str, style);
    } else {
        return str;
    }
}

function colorize(str, color) {
    var code = colors[color];
    if (!code) return str;
    return '\u001b[' + code[0] + 'm' + str +
           '\u001b[' + code[1] + 'm';
};

exports.stylize = stylize;
exports.colorize = colorize;
exports.$ = function $(str) {
    str = new(String)(str);

    colorNames.forEach(function (name) {
        Object.defineProperty(str, name, {
            get: function () {
                return $(colorize(this, name));
            }
        });
    });
    return str;
};

exports.$.puts = function () {
    util.puts([].join.call(arguments, ' '));
};

