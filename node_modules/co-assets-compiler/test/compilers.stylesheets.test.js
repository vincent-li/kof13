var fs = require('fs')
  , path = require('path')
  , request = require('supertest')
  , express = require('express')
  , should  = require('should')
  , utils   = require('./utils');

describe('assets-compiler', function() {

  describe('compilers', function() {

    /*
     * Stylus Compiler
     */
    it('should compile stylus stylesheets', function (done) {
      utils.invalidateRequireCache(); // To get a fresh compound app

      var app = getApp();
      var compound = app.compound;

      // App settings
      app.set('cssEngine', 'stylus');
      app.set('cssDirectory', '/stylesheets');
      app.use(express.static(app.root + '/public'));

      // Make sure previously precompiled assets are deleted
      var cssDir = app.root + '/public/stylesheets';
      utils.ensureDirClean(cssDir);

      // Fake a stylesheet request
      request(app)
        .get('/stylesheets/application.css')
        .end(function (err, res) {
          should.not.exist(err);

          res.headers['content-type'].should.match(/^text\/css/);
          res.headers['content-length'].should.equal('29');

          res.text.should.equal(fs.readFileSync(app.root + '/public/stylesheets/application.css').toString());

          utils.ensureDirClean(cssDir);
          done();
        });

    });


    /*
     * SASS Compiler
     */
    it('should compile SASS stylesheets', function (done) {
      utils.invalidateRequireCache(); // To get a fresh compound app

      var app = getApp();
      var compound = app.compound;

      // App settings
      app.set('cssEngine', 'sass');
      app.set('cssDirectory', '/stylesheets');
      app.use(express.static(app.root + '/public'));

      // Make sure previously precompiled assets are deleted
      var cssDir = app.root + '/public/stylesheets';
      utils.ensureDirClean(cssDir);

      // Fake a stylesheet request
      request(app)
        .get('/stylesheets/application.css')
        .end(function (err, res) {
          should.not.exist(err);

          res.headers['content-type'].should.match(/^text\/css/);
          res.headers['content-length'].should.equal('30');

          res.text.should.equal(fs.readFileSync(app.root + '/public/stylesheets/application.css').toString());

          utils.ensureDirClean(cssDir);
          done();
        });

    });


    /*
     * LESS Compiler
     */
    it('should compile LESS stylesheets', function (done) {
      utils.invalidateRequireCache(); // To get a fresh compound app

      var app = getApp();
      var compound = app.compound;

      // App settings
      app.set('cssEngine', 'less');
      app.set('cssDirectory', '/stylesheets');
      app.use(express.static(app.root + '/public'));

      // Make sure previously precompiled assets are deleted
      var cssDir = app.root + '/public/stylesheets';
      utils.ensureDirClean(cssDir);

      // Fake a stylesheet request
      request(app)
        .get('/stylesheets/application.css')
        .end(function (err, res) {
          should.not.exist(err);

          res.headers['content-type'].should.match(/^text\/css/);
          res.headers['content-length'].should.equal('32');

          res.text.should.equal(fs.readFileSync(app.root + '/public/stylesheets/application.css').toString());

          utils.ensureDirClean(cssDir);
          done();
        });

    });

  });

});