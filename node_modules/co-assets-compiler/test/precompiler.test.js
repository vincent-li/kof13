var fs = require('fs')
  , path = require('path')
  , utils = require('./utils');

describe('assets-compiler', function() {

  describe('precompilation', function() {

    it('should precompile stylesheets', function (done) {
      utils.invalidateRequireCache(); // To get a fresh compound app

      var app = getApp();
      var compound = app.compound;

      // App settings
      app.set('cssDirectory', '/stylesheets');
      app.enable('merge stylesheets');

      // Make sure previously precompiled assets are deleted
      var cssDir = app.root + '/public/stylesheets';
      utils.ensureDirClean(cssDir);

      // Wait some time for precompiler to finish
      // TODO: Replace this with an event
      setTimeout(function () {
        fs.existsSync(path.resolve(cssDir, 'application.css')).should.be.true;
        fs.existsSync(path.resolve(cssDir, 'stuff.css')).should.be.true;

        // Clean up
        utils.ensureDirClean(cssDir);
        done();
      }, 500);

    });

    it('should precompile coffeescripts', function (done) {
      utils.invalidateRequireCache(); // To get a fresh compound app

      var app = getApp();
      var compound = app.compound;

      // App settings
      app.set('jsDirectory', '/javascripts');
      app.enable('merge javascripts');

      // Make sure previously precompiled assets are deleted
      var jsDir = app.root + '/public/javascripts';
      utils.ensureDirClean(jsDir);

      // Wait some time for precompiler to finish
      // TODO: Replace this with an event
      setTimeout(function () {
        fs.existsSync(path.resolve(jsDir, 'application.js')).should.be.true;

        // Clean up
        utils.ensureDirClean(jsDir);
        done();
      }, 500);

    });

  });

});