// Deps
var fs          = require('fs'),
    path        = require('path'),
    Module      = require('module'),
    utils       = require('./utils'),
    runCode     = utils.runCode,
    existsSync  = utils.existsSync;

var Schema = require('jugglingdb').Schema; 

/**
 * Initialize models
 */
exports.init = function (root) { 
    happ.orm._schemas = [];
    
    var app, models;
    app = global.app;
    models = app.models;
    
    var confFile = root + '/config/database.json';
    var config;

    if (fs.existsSync(confFile)) {
        try {
            config = JSON.parse(fs.readFileSync(confFile, 'utf-8'))[app.set('env')];
        } catch (e) {
            console.log('Could not parse config/database.json');
            throw e;
        }
    } else {
        config = {};
    }
    
    var schema = new Schema(config && config.driver || 'memory', config);
    schema.log = log;
    happ.orm._schemas.push(schema);

    var context = prepareContext(schema);
    // run schema first
    var schemaFile = root + '/db/schema.';
    if (existsSync(schemaFile + 'js')) {
        schemaFile += 'js';
    }else {
        schemaFile = false;
    }

    if (schemaFile) {
        runCode(schemaFile, context);
    }

    // and freeze schemas
    happ.orm._schemas.forEach(function (schema) {
        schema.freeze();
    });

    exports.loadModels(root + '/app/models/');
};

global.publish = function (name, model) {
    console.log('WARNING: `publish` call inside model files deprecated now, use module.exports = MyModel in case of declaring new model in app/models/*.js file, and not in db/schema.js');
    if (typeof name === 'function') {
        model = name;
        name = model.name;
    }
    app.models[name] = model;
    global[name] = model;
};

exports.loadModels = function (modelsDir) {
    var ctx = {};

    Object.keys(app.models).forEach(function (model) {
        ctx[model] = app.models[model];
        if (ctx[model]._validations) delete ctx[model]._validations;
    });

    if (utils.existsSync(modelsDir)) {
        fs.readdirSync(modelsDir).forEach(function (file) {
            if (file.match(/^[^\.].*?\.(js|coffee)$/)) {
                var filename = path.join(modelsDir, file);
                delete Module._cache[filename];
                var m = require(filename);
                if (m && (m.name || m.modelName)) {
                    var name = m.modelName || m.name;
                    app.models[name] = m;
                    global[name] = m;
                }
            }
        });
    }

};

app.disconnectSchemas = function disconnectSchemas() {
    if (_schemas.length) {
        _schemas.forEach(function (schema) {
            schema.disconnect();
        });
        _schemas = [];
    }
}

function log(str, startTime) {
    var $ = warlock.utils.stylize.$;
    var m = Date.now() - startTime;
    warlock.utils.debug(str + $(' [' + (m < 10 ? m : $(m).red) + ' ms]').bold);
    app.emit('app-event', {
        type: 'query',
        param: str,
        time: m
    });
}

function prepareContext(defSchema, done) {
    var ctx = {app: app},
        models = {},
        settings = {},
        cname,
        schema,
        wait = connected = 0,
        nonJugglingSchema = false;

    done = done || function () {};

    /**
     * Multiple schemas support
     * example:
     * schema('redis', {url:'...'}, function () {
     *     describe models using redis connection
     *     ...
     * });
     * schema(function () {
     *     describe models stored in memory
     *     ...
     * });
     */
    ctx.schema = function () {
        var name = argument('string');
        var opts = argument('object') || {};
        var def = argument('function') || function () {};
        schema = new Schema(name || opts.driver || 'memory', opts);
        happ.orm._schemas.push(schema);
        wait += 1;
        ctx.gotSchema = true;
        schema.on('log', log);
        schema.on('connected', function () {
            if (wait === ++connected) done();
        });
        def();
        schema = false;
    };

    /**
     * Use custom schema driver
     */
    ctx.customSchema = function () {
        var def = argument('function') || function () {};
        nonJugglingSchema = true;
        def();
        Object.keys(ctx.exports).forEach(function (m) {
            ctx.define(m, ctx.exports[m]);
        });
        nonJugglingSchema = false;
    };
    ctx.exports = {};
    ctx.module = { exports: ctx.exports };

    /**
     * Define a class in current schema
     */
    ctx.describe = ctx.define = function (className, callback) {
        var m;
        cname = className;
        models[cname] = {};
        settings[cname] = {};
        if (nonJugglingSchema) {
            m = callback;
        } else {
            callback && callback();
            m = (schema || defSchema).define(className, models[cname], settings[cname]);
        }
        return global[cname] = app.models[cname] = ctx[cname] = m;
    };

    /**
     * Define a property in current class
     */
    ctx.property = function (name, type, params) {
        if (!params) params = {};
        if (typeof type !== 'function' && typeof type === 'object') {
            params = type;
            type = String;
        }
        params.type = type || String;
        models[cname][name] = params;
    };

    /**
     * Set custom table name for current class
     * @param name - name of table
     */
    ctx.setTableName = function (name) {
        if (cname) settings[cname].table = name;
    };

    ctx.Text = Schema.Text;

    return ctx;

    function argument(type) {
        var r;
        [].forEach.call(arguments.callee.caller.arguments, function (a) {
            if (!r && typeof a === type) r = a;
        });
        return r;
    }
}