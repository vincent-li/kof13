var fs = require('fs')
  , path = require('path')
  , request = require('supertest')
  , express = require('express')
  , should  = require('should')
  , utils   = require('./utils');

describe('assets-compiler', function() {

  it('should always compile assets if "force assets compilation" is enabled', function (done) {
    utils.invalidateRequireCache(); // To get a fresh compound app

    var app = getApp();
    var compound = app.compound;

    // App settings
    app.set('cssEngine', 'stylus');
    app.set('cssDirectory', '/stylesheets');
    app.enable('force assets compilation');
    app.use(express.static(app.root + '/public'));

    // Make sure previously precompiled assets are deleted
    var cssDir = app.root + '/public/stylesheets';
    utils.ensureDirClean(cssDir);

    // Make first stylesheet request
    request(app)
      .get('/stylesheets/application.css')
      .end(function (err, res) {
        var stat = fs.statSync(cssDir + '/application.css')
          , firstMtime = stat.mtime;

        // Wait some time
        setTimeout(function () {

          // Make second stylesheet request
          request(app)
            .get('/stylesheets/application.css')
            .end(function (err, res) {
              var stat = fs.statSync(cssDir + '/application.css')
                , secondMtime = stat.mtime;

              (secondMtime - firstMtime).should.be.above(0);

              utils.ensureDirClean(cssDir);
              done();

            });

        }, 1000)


      });

  });

  it('should always NOT compile assets if "force assets compilation" is disabled', function (done) {
    utils.invalidateRequireCache(); // To get a fresh compound app

    var app = getApp();
    var compound = app.compound;

    // App settings
    app.set('cssEngine', 'stylus');
    app.set('cssDirectory', '/stylesheets');
    app.disable('force assets compilation');
    app.use(express.static(app.root + '/public'));

    // Make sure previously precompiled assets are deleted
    var cssDir = app.root + '/public/stylesheets';
    utils.ensureDirClean(cssDir);

    // Make first stylesheet request
    request(app)
      .get('/stylesheets/application.css')
      .end(function (err, res) {
        var stat = fs.statSync(cssDir + '/application.css')
          , firstMtime = stat.mtime;

        // Wait some time
        setTimeout(function () {

          // Make second stylesheet request
          request(app)
            .get('/stylesheets/application.css')
            .end(function (err, res) {
              var stat = fs.statSync(cssDir + '/application.css')
                , secondMtime = stat.mtime;

              (secondMtime - firstMtime).should.equal(0);

              utils.ensureDirClean(cssDir);
              done();

            });

        }, 1000)


      });

  });

});