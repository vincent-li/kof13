var express    = require('express');

app.configure(function(){
    var cwd = process.cwd();
    app.use(express.static(cwd + '/webapp', {maxAge: 86400000}));
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session({secret: 'secret'}));
    app.use(express.methodOverride());
    app.use(app.router);
});
