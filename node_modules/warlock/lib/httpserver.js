var express = require('express');
var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var Map = require('./routes').Map;
var sys       = require('util');

function HttpServer() {
    global.happ       = this;
    this.orm          = {};
    this.controller   = require('./controller');
    this.models       = require('./models');
    this.ControllerBridge = require('./routermapping');
    this.controllerBridge = new this.ControllerBridge;
    this.routeMapper = new Map(app, this.controllerBridge.uniCaller.bind(this.controllerBridge));
}

exports.init = function (app) {
    var isMainModule = !global.hasOwnProperty('app');
    // globalize app object
    if (isMainModule) {
        global.app = app;
        app.models = {};
    }

    var root = process.cwd();
    app.root = root;
    //创建一个httpserver对象
    new HttpServer();

    // run environment.{js} and environments/{test|development|production}.{js}
    configureApp();

    // controllers should be loaded 
    happ.controller.init(root);
    
    // models should be loaded
    happ.models.init(root);

    // run config/initializers/*
    runInitializers();

    if (fs.existsSync(root + '/config') && fs.existsSync(root + '/config/routes.js')) {
        happ.routeMapper.addRoutes(root + '/config/routes');
    }
    app.reloadModels = happ.models.loadModels;
    process.nextTick(function () {
        warlock.logger.init();
    });
};
exports.createServer = function (options) {
    options = options || {};
    var express = require('express');

    var app = express();

    exports.init(app);

    return app;
};

function configureApp() {
    var mainEnv = app.root + '/config/environment';
    requireIfExists(mainEnv + '.js');
    var supportEnv = app.root + '/config/environments/' + app.settings.env;
    requireIfExists(supportEnv + '.js');
}

function requireIfExists(module) {
    if (fs.existsSync(module)) {
        require(module);
        return true;
    } else {
        return false;
    }
}

function runInitializers() {

    var context = {global: {}};

    for (var i in app.models) {
        context[i] = app.models[i];
    }

    var initializersPath = app.root + '/config/initializers/';
    if (fs.existsSync(initializersPath)) {
        fs.readdirSync(initializersPath).forEach(function (file) {
            if (file.match(/^\./)) return;
            var script_name = initializersPath + file;
            utils.runCode(script_name, context);
        });
        for (var i in context.global) {
            global[i] = context.global[i];
        }
    }
}