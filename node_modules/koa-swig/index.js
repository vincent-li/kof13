'use strict';

/**
 * Module dependences.
 */

var debug = require('debug')('koa:swig');
var mixin = require('utils-merge');
var path = require('path');
var swig = require('swig');
var extname = path.extname;
var resolve = path.resolve;

/**
 * Expose `render`, `swig`.
 */

exports = module.exports = renderer;
exports.swig = swig;

/**
 * Default render settings.
 */

var defaultSettings = {
  autoescape: true,
  root: 'views',
  cache: 'memory',
  ext: 'html',
  writeBody: true
  /*
  locals: {},
  filters: {}.
  tags: {},
  extensions: {}
  */
};

// Generator `renderFile`

function renderFile(pathName, locals) {
  return function(done) {
    swig.renderFile(pathName, locals, done);
  };
}

function renderer(app, settings) {
  if (app.context.render) {
    return;
  }

  app.context.render = render;

  // merge default settings
  var sets = Object.create(defaultSettings);

  // merge settings
  if (settings) {
    mixin(sets, settings);
  }
  settings = sets;

  var root = settings.root;
  var locals = settings.locals;
  var cache = settings.cache;
  var defaults = {
    autoescape: settings.autoescape,
    cache: cache,
    locals: locals
  };
  if (settings.varControls) {
    defaults.varControls = settings.varControls;
  }
  swig.setDefaults(defaults);

  // swig custom filters
  setFilters(swig, settings.filters);

  // swig custom tags
  setTags(swig, settings.tags);

  // add extensions for custom tags
  setExtensions(swig, settings.extensions);

  function* render(view, options) {
    // default extname
    var e = extname(view);

    if (!e) {
      e = '.' + settings.ext;
      view += e;
    }

    // resolve
    view = resolve(root, view);

    // merge ctx.state
    var opts = this.state || {};

    // merge ctx.flash, for `koa-flash`
    mixin(opts, {
      flash: this.flash,
      cache: cache
    });

    // merge settings.locals
    mixin(opts, locals);

    // merge options
    mixin(opts, options || {});

    debug('render %s %j', view, opts);
    var html = yield renderFile(view, opts);
    /* jshint validthis:true */

    if (settings.writeBody === true) {
      this.body = html;
    }

    return html;
  }
}

/**
 *  Add filters for Swig
 */

function setFilters(swig, filters) {
  for (var name in filters) {
    swig.setFilter(name, filters[name]);
  }
}

/**
 * Add tags for Swig
 */

function setTags(swig, tags) {
  var name, tag;
  for (name in tags) {
    tag = tags[name];
    swig.setTag(name, tag.parse, tag.compile, tag.ends, tag.blockLevel);
  }
}

/**
 * Add extensions for Swig
 */

function setExtensions(swig, extensions) {
  for (var name in extensions) {
    swig.setExtension(name, extensions[name]);
  }
}
