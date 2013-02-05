var path = require('path');
var fs = require('fs');
var readline = require('readline');
var childProcess = require('child_process');
var sys = require('util');

/**
 * Print routing map
 * @param filter
 */
exports.routes = routes;

routes.help = {
    shortcut:    'r',
    usage:       'routes [filter]',
    description: 'Display application routes'
};

function routes() {

    var mapper = warlock.routeMapper;
    var addSpaces = warlock.utils.addSpaces;
    var dump = mapper.dump;
    var max_len = 0, helper_max_len = 0;
    var filter = (args.shift() || '').toUpperCase();
    var filtered = [];

    dump.forEach(function (data) {
        var method = data.method.toUpperCase();
        if (!filter || filter === method || data.helper.toUpperCase().search(filter) !== -1) {
            if (data.path.length > max_len) {
                max_len = data.path.length;
            }
            if (data.helper.length > helper_max_len) {
                helper_max_len = data.helper.length;
            }
            filtered.push(data);
        }
    });

    filtered.forEach(function (data) {
        var method = data.method.toUpperCase();
        console.log(
            addSpaces(data.helper, helper_max_len + 1, true) + ' ' +
            addSpaces(method, 7) +
            addSpaces(data.path, max_len + 1) +
            data.file + "#" + data.action
        );
    });

    return true;
}

/**
 * Debug console
 * node REPL console with Warlock bindings
 */

exports.console = warlockConsole;

warlockConsole.help = {
    shortcut:    'c',
    usage:       'console',
    description: 'Debug console'
};

function warlockConsole() {
    var ctx = require('repl').start('warlock> ').context;

    ctx.reload = function () {
        global.models = {};
        ctx.app = app;
        app.reloadModels();

        for (var m in models) {
            ctx[m] = models[m];
        }
    };

    ctx.c = function () {
        var l = arguments.length,
            message = 'Callback called with ' + l +
                ' argument' + (l === 1 ? '' : 's') + (l > 0 ? ':\n' : '');

        for (var i = 0; i < 10; i++) {
            if (i < arguments.length) {
                ctx['_' + i] = arguments[i];
                message += '_' + i + ' = ' + arguments[i] + '\n';
            } else {
                if (ctx.hasOwnProperty('_' + i)) {
                    delete ctx['_' + i];
                }
            }
        }
        console.log(message);
    };

    ctx.exit = function () {
        process.exit(0);
    };

    process.nextTick(ctx.reload);

    return false;
}

exports.dbconsole = function dbconsole() {
    var db = childProcess.spawn('mongo');
    var rli = readline.createInterface(process.stdin, process.stdout, autocomplete);
    var data = '';
    db.stdout.on('data', function (chunk) {
        data += chunk;
        write();
    });
    function write() {
        if (write.to) {
            clearTimeout(write.to);
        }
        setTimeout(function () {
            process.stdout.write(data);
            rli.prompt();
            data = '';
        }, 50);
    }
    rli.on('SIGINT', rli.close.bind(rli));
    rli.addListener('close', process.exit);
    rli.setPrompt('mongo > ');
    rli.addListener('line', function (line) {
        db.stdin.write(line + '\n');
    });
    // console.log(db);
    function autocomplete(input) {
        return [['help', 'test'], input];
    }
}

/**
 * Warlock server
 */
exports.server = server;

server.help = {
    shortcut: 's',
    usage: 'server [port]',
    description: 'Run websocket server'
};

function server() {
    var port = process.env.PORT || args.shift() || 3000;
    app.listen(port);
    console.log("warlock server listening on port %d within %s environment", port, app.settings.env);
    //根据app创见一个web socket server
    require('./websocketserver').initWebsocket();
    
    return false;
}

/**
 * Install warlock extension
 */

exports.install = install;

install.help = {
    shortcut: 'x',
    usage: 'install gitUrl [extName]',
    description: 'Install warlock eXtension'
};

function install() {
    var what = args.shift(), where = args.shift();
    if (!what || !what.match(/\.git$/)) {
        console.log('What do you want to install?');
        return true;
    }

    if (!where) {
        var m = what.match(/\/([^\/]*?)\.git/);
        where = m[1];
    }

    if (!fs.existsSync(app.root + '/node_modules')) {
        fs.mkdirSync(app.root + '/node_modules');
    }

    var command = 'clone';
    if (fs.existsSync(app.root + '/.git')) {
        command = 'submodule add';
    }

    console.log('Installing ' + where + ' extension from ' + what + ' repo to node_modules/' + where);

    var cp = require('child_process');
    cp.exec('git ' + command + ' ' + what + ' node_modules/' + where, function () {
        if (fs.existsSync(app.root + '/npmfile.coffee')) {
            cp.exec('echo "require \'' + where + '\'" >> npmfile.coffee');
            console.log('Patched npmfile.coffee');
        } else {
            cp.exec('echo "require(\'' + where + '\');" >> npmfile.js');
            console.log('Patched npmfile.js');
        }
        var installScript = app.root + '/node_modules/' + where + '/install.js';
        if (fs.existsSync(installScript)) {
            console.log('Running installation script');
            require(installScript);
        } else {
            process.exit(0);
        }
    });
    return false;
}
