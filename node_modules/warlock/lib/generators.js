/**
 * Module dependencies
 */
var path      = require('path');
var fs        = require('fs');
var sys       = require('util');

/**
 * Shortcut required warlock utils
 */
// var pluralize = warlock.utils.pluralize;
// var camelize  = warlock.utils.camelize;
var $         = warlock.utils.stylize.$;
var exec      = require('child_process').exec

/**
 * Command line options
 * populated by parseOptions method
 *
 * @api private
 */
var options   = {};

/**
 * Generators collection hash
 *
 * @type Hash
 * @api private
 */
var collection = {};

/**
 * Add generator to collection
 *
 * @param name
 * @param callback
 * @param meta Object {description: String, examples: [String]}
 * @api public
 */
function addGenerator(name, callback, meta) {
    meta = meta || {};
    callback.meta = meta;
    collection[name] = callback;
}
exports.addGenerator = addGenerator;

/**
 * Check whether generator exists
 * @param name - name of generator
 * @api public
 */
function exists(name) {
    return !!collection[name];
}
exports.exists = exists;

/**
 * Call generator method
 */
function perform(name, args) {
    collection[name](args);
}
exports.perform = perform;

exports.list = function () {
    return Object.keys(collection).join(' ');
};

/**
 * Add built-in generators
 */
(function () {

    addGenerator('init', initProjectStructure);
    addGenerator('package', packageProject);

    function initProjectStructure(args) {
        parseOptions();
        sys.puts($('start create system files, please wait for a moment').bold.green);
        [ 'app/',
          'app/actions/',
          'app/models/',
          'app/controllers/',
          'db/',
          'log/',
          'build/',
          'webapp/',
          'webapp/images',
          'webapp/css/',
          'webapp/lib/',
          'node_modules/',
          'config/',
          'config/environments/',
          'config/initializers/'
        ].forEach(createDir);
        sys.puts('init catagry ok!');
        var db = options.db;
        createFileByTemplate('config/routes.js', 'config/routes.js');
        sys.puts('copy routes.js ok!');
        createFileByTemplate('config/database.json', 'config/database_' + db + '.json', replaceAppname);
        createFileByTemplate('db/schema.js', 'db/schema.js');
        createFileByTemplate('config/environment',              'config/environment');
        createFileByTemplate('config/environments/test',        'config/environments/test');
        createFileByTemplate('config/environments/development', 'config/environments/development');
        createFileByTemplate('config/environments/production',  'config/environments/production');
        createFileByTemplate('package.json', 'package.json', [replaceAppname]);
        createFileByTemplate('app/controllers/welcome.js', 'welcome.js');
        createFileByTemplate('webapp/index.html', 'index.html');
        var srv = createFileByTemplate('server', 'server');
        fs.chmodSync(srv, 0755);
        process.exit();
    }

    function packageProject(gzip){
        [ 'app/',
          'app/models/',
          'app/controllers/',
          'db/',
          'log/',
          'build/',
          'webapp/',
          'webapp/images',
          'webapp/css/',
          'webapp/libs/',
          'node_modules/',
          'config/',
          'config/environments/',
          'config/initializers/'
        ].forEach(createDir);
    }

    /**
     * Private helper methods
     */

     function controllerCode(model, driver, result) {
        var fileExtension = options.coffee ? '.coffee' : '.js';
        var code;
        code = fs.readFileSync(__dirname + '/../templates/crud_controller' + fileExtension);
        code = code
            .toString('utf8')
            .replace(/models/g, pluralize(model).toLowerCase())
            .replace(/model/g, model.toLowerCase())
            .replace(/Model/g, camelize(model, true))
            .replace(/FILTER_PROPERTIES/g, '[' + result.map(function (p) {
                return "'" + p.name + "'";
            }).join(', ') + ']');
        return code;
    }

    function parseOptions() {
        options = [];
        options.db = 'memory';
        var cwd = app.root.split('\\');
        options.appname = cwd[cwd.length-1];
    }

    function createDir(dir) {
        var root = process.cwd();
        if (options.appname && !createDir.rootCreated) {
            createDir.rootCreated = true;
            createDir('');
        }
        if (options.appname) {
            dir = '/' + dir;
        }
        if (fs.existsSync(root + '/' + dir)) {
            sys.puts($('exists').bold.grey + '  ' + dir);
        } else {
            fs.mkdirSync(root + '/' + dir, 0755);
            sys.puts($('create').bold.green + '  ' + dir);
        }
    }

    function appendToFile(filename, contents) {
        var root = process.cwd() + '/',
            fd = fs.openSync(root + filename, 'a');
        fs.writeSync(fd, contents);
        fs.closeSync(fd);
    }

    function createFile(filename, contents) {
        var root = process.cwd();
        if (options.appname) {
            filename = '/' + filename;
        }
        var fullPath = root + '/' + filename;
        if (fs.existsSync(fullPath)) {
            sys.puts($('exists').bold.grey + '  ' + filename);
        } else {
            fs.writeFileSync(fullPath, contents);
            sys.puts($('create').bold.green + '  ' + filename);
        }
        return fullPath;
    }

    function createFileByTemplate(filename, template, prepare) {
        if (!template.match(/\..+$/)) {
            var fileExtension = '.js';
            template += fileExtension;
            filename += fileExtension;
        }
        var text = fs.readFileSync(__dirname + '/../templates/' + template);
        if (prepare) {
            text = text.toString('utf8');
            if (typeof prepare === 'function') {
                prepare = [prepare];
            }
            prepare.forEach(function (p) {
                text = p(text);
            });
        }
        return createFile(filename, text);
    }

    function createViewByTemplate(filename, template, prepare) {
        options.tpl = options.tpl || 'ejs';
        var package = options.tpl + '-ext', tpl;
        try {
            tpl = require(package);
        } catch (e) {
            sys.puts($('Templating engine ' + options.tpl + ' is not supported').red);
            return;
        }
        var text = fs.readFileSync(tpl.template(template));
        if (prepare) {
            text = prepare(text.toString('utf8'));
        }
        return createFile(filename + tpl.extension, text);
    }

    function createView(filename, template, data, fn) {
        options.tpl = options.tpl || 'ejs';
        var package = options.tpl + '-ext';
        try {
            var tpl = require(package);
        } catch (e) {
            sys.puts($('Templating engine ' + options.tpl + ' is not supported').red);
            return;
        }
        var text = tpl.templateText(template, data);
        if (typeof fn === 'function') {
            text = fn(text.toString());
        }
        return createFile(filename + tpl.extension, text);
    }

    function createParents(ns, d) {
        ns.forEach(function (dir) {
            d += dir + '/';
            createDir(d);
        });
    }

    function formatType(name) {
        name = (name || 'string').toLowerCase();
        switch (name) {
        case 'string':   return 'String';

        case 'date':     return 'Date';

        case 'bool':
        case 'boolean':  return 'Boolean';

        case 'int':
        case 'real':
        case 'float':
        case 'decimal':
        case 'number':   return 'Number';
        }
        return '"' + name + '"';
    }

    function replaceAppname(template) {
        return template.replace(/APPNAME/g, options.appname || 'default');
    }

    function ormDriver() {
        if (!ormDriver.config) {
            ormDriver.config = JSON.parse(require('fs').readFileSync(process.cwd() + '/config/database.json', 'utf8')).development;
        }
        return ormDriver.config.driver;
    }

})();
