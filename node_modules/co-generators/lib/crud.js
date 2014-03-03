/**
 * lib/generators/crud_generator.js
 *
 * @defines {CrudGenerator}
 * @since {1.1.4}
 * @creator {Sascha Gehlich <sascha@gehlich.us>}
 * @description {
 *   Generates a scaffold
 * }
 */

/**
 * Module dependencies
 */
var util = require('util')
  , BaseGenerator = require('compound/lib/server/generators/base_generator')
  , ModelGenerator = require('./model.js')
  , path = require('path')
  , fs = require('fs')
  , sys = require('sys');

var pluralize, singularize;

/**
 * Generates a scaffold
 *
 * @constructor
 */
function CrudGenerator() {
  CrudGenerator.super_.call(this);
  this.templatesPath = __dirname + '/../assets';
};
util.inherits(CrudGenerator, BaseGenerator);

/**
 * Command line aliases
 */
CrudGenerator.aliases = [ 'crud', 'c', 'scaffold', 's' ];

/**
 * Default key name (first command line argument is stored in options[defaultKeyName])
 */
CrudGenerator.prototype.defaultKeyName = 'controllerName';

/**
 * Performs the generator action
 *
 * @param {Array} arguments
 */
CrudGenerator.prototype.perform = function (args) {
  BaseGenerator.prototype.perform.apply(this, arguments);

  pluralize = this.app.compound.utils.pluralize;
  singularize = this.app.compound.utils.singularize;

  if (this.options.appName) {
    this.baseDir = path.join(this.baseDir, this.options.appName);
  }

  this.createDirectoryStructure();
  this.generateController();
  this.generateModel();
  this.copyFiles();
  this.patchRoutes();
};

/**
 * Generates CRUD controller
 */
CrudGenerator.prototype.generateController = function () {
  var model = this.options.controllerName.split('.').pop();
  model = singularize(model) || model;
  var parents = this.options.controllerName.split('.').slice(0, -1);
  var models = pluralize(model).toLowerCase();
  var isEval = this.isEvalAllowed();

  var variables = {
    'CODE': this.getCodeExtension(),
    'eval': isEval ? '_eval' : '',
    'ctlSuffix': isEval ? '_controller' : '',
    'new_model': this.generateStringFromParents('new_', parents, model),
    'edit_model': this.generateStringFromParents('edit_', parents, model, true),
    'pathTo.models': this.generateStringFromParents('pathTo.', parents, models),
    'pathTo.model': this.generateStringFromParents('pathTo.', parents, model, true),
    'path_to.models': this.generateStringFromParents('path_to.', parents, models),
    'path_to.model': this.generateStringFromParents('path_to.', parents, model, true),
    'models': models,
    'model': model,
    'Model': this.app.compound.utils.camelize(model, true),
    'Models': this.app.compound.utils.camelize(model, true)
  };

  this.copyController('crud_controller{{ eval }}.{{ CODE }}', 'app/controllers/' + models + '{{ ctlSuffix }}.{{ CODE }}', variables);
};

/**
 * Asks the ModelGenerator to generate a model
 */
CrudGenerator.prototype.generateModel = function() {
  this.modelGenerator = new ModelGenerator();
  this.modelGenerator.init(this.app.compound);
  this.modelGenerator.perform(this.args);
};

/**
 * Creates the basic directory structure
 */
CrudGenerator.prototype.createDirectoryStructure = function () {
  var self = this;

  var model = this.options.controllerName.split('.').pop();
  var parents = this.options.controllerName.split('.').slice(0, -1);
  var models = this.app.compound.utils.pluralize(model).toLowerCase();

  if (!model) {
      console.log('Usage example: compound g crud post title content' +
          'published:boolean');
      console.log('               compound g crud post title content' +
          'published:boolean --coffee');
      return;
  }
  var ns = models.split('/');
  ns.pop();

  [

    'app/',
    'app/controllers/',
    'app/helpers/',
    'app/views/',
    'app/views/' + models + '/',
    'app/views/layouts',
    'test/',
    'test/controllers/',

  ].forEach(function (dir) {
    self.createDirectory(dir);
  });

  this.createParentDirectories(ns, 'app/controllers/');

};

/**
 * Copy files from templates directory
 */
CrudGenerator.prototype.copyFiles = function () {
  var self = this;

  var model = this.options.controllerName.split('.').pop().toLowerCase();
  model = singularize(model) || model;
  var parents = this.options.controllerName.split('.').slice(0, -1);
  var models = this.app.compound.utils.pluralize(model).toLowerCase();

  var modelProperties = this.modelGenerator.parseProperties();

  var templateVariables = {
    'CODE':   this.getCodeExtension(),
    'TPL':    this.getTemplateEngine(),
    'MODELS': models,
    'VALID_ATTRIBUTES': modelProperties.map(function (attr) {
      return attr.name + ": ''";
    }).join(',\n        '),

    'new_model': this.generateStringFromParents('new_', parents, model),
    'edit_model': this.generateStringFromParents('edit_', parents, model, true),
    'path_to.models': this.generateStringFromParents('path_to.', parents, models),
    'path_to.model': this.generateStringFromParents('path_to.', parents, model, true),
    'pathTo.models': this.generateStringFromParents('pathTo.', parents, models),
    'pathTo.model': this.generateStringFromParents('pathTo.', parents, model, true),
    'models': models,
    'model': model,
    'Model': this.app.compound.utils.camelize(model, true)
  };

  /**
   * Templates
   */
  [

    [ 'scaffold_layout'
      , 'app/views/layouts/{{ MODELS }}_layout.{{ TPL }}'],
    [ 'scaffold_form'
      , 'app/views/{{ MODELS }}/_form.{{ TPL }}'],

    // CRUD
    [ 'scaffold_show'
      , 'app/views/{{ MODELS }}/show.{{ TPL }}'],
    [ 'scaffold_new'
      , 'app/views/{{ MODELS }}/new.{{ TPL }}'],
    [ 'scaffold_edit'
      , 'app/views/{{ MODELS }}/edit.{{ TPL }}'],
    [ 'scaffold_index'
      , 'app/views/{{ MODELS }}/index.{{ TPL }}']

  ].forEach(function (file) {
    var sourceFileIndex = 0
      , destFileIndex   = 1

    var modelProperties = self.modelGenerator.parseProperties();
    self.copyTemplate(file[sourceFileIndex], file[destFileIndex], templateVariables, modelProperties);
  });

  /**
   * Model helper / tests
   */
  [
    [ 'app/helpers/model_helper.{{ CODE }}'
      , 'app/helpers/{{ MODELS }}.{{ CODE }}' ],
    [ 'test/controllers/crud_controller.test.js'
      , 'test/controllers/{{ MODELS }}_controller.test.js'],
    [ 'test/init.js'
      , 'test/init.js']
  ].forEach(function (file) {
    var sourceFileIndex = 0
      , destFileIndex   = 1
    self.copyFile(file[sourceFileIndex], file[destFileIndex], templateVariables);
  });
};

/**
 * Adds resource routes
 */
CrudGenerator.prototype.patchRoutes = function() {
  var model = this.options.controllerName.split('.').pop();
  var parents = this.options.controllerName.split('.').slice(0, -1);
  var models = this.app.compound.utils.pluralize(model).toLowerCase();
  var $ = this.app.compound.utils.stylize.$;


  var routesFile = 'config/routes.' + this.getCodeExtension();
  var routesFilePath = path.join(process.cwd(), routesFile);
  try {
      var routes = fs.readFileSync(routesFilePath, 'utf8')
        .toString()
        .replace(/\s+$/g, '')
        .split('\n');
  } catch (e) { return }

  var mapRouteResources = this.options.coffee ?
    '  map.resources \'' + models + '\'\n' :
    '    map.resources(\'' + models + '\');\n';

  if(!routes.some(containRoute)) {
    var firstLine = routes.shift();
    routes.unshift(mapRouteResources);
    routes.unshift(firstLine);

    var newRoutesContent = routes.join('\n');
    fs.writeFileSync(routesFilePath, newRoutesContent);
    sys.puts($('patch').bold.blue + '   ' + routesFile);
  }

  function containRoute(line) {
    var m = line.match(/^\s*map\.resources(\(|\s)'([^']+)'/);
    return m && m[1] == models;
  }
};

/**
 * Helper methods for renaming / replacing template variables
 */

module.exports = CrudGenerator;
