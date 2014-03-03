require('should');

global.getApp = function(done) {
  var app = require('compound').createServer()

  app.renderedViews = [];
  app.flashedMessages = {};

  // Monkeypatch app#render so that it exposes the rendered view files
  app._render = app.render;
  app.render = function (viewName, opts, fn) {
    app.renderedViews.push(viewName);

    // Deep-copy flash messages
    var flashes = opts.request.session.flash;
    for(var type in flashes) {
      app.flashedMessages[type] = [];
      for(var i in flashes[type]) {
        app.flashedMessages[type].push(flashes[type][i]);
      }
    }

    return app._render.apply(this, arguments);
  }

  // Check whether a view has been rendered
  app.didRender = function (viewRegex) {
    var didRender = false;
    app.renderedViews.forEach(function (renderedView) {
      if(renderedView.match(viewRegex)) {
        didRender = true;
      }
    });
    return didRender;
  }

  // Check whether a flash has been called
  app.didFlash = function (type) {
    return !!(app.flashedMessages[type]);
  }

  return app;
};