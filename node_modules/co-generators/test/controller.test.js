var sys = require('sys');

describe('controller', function() {
    var app, compound, output, puts;

    before(function() {
        app = getApp();
        compound = app.compound;
        stubFS();
    });

    after(unstubFS);

    beforeEach(function() {
        output = [];
        puts = sys.puts;
        sys.puts = function(str) {
            output.push(str.replace(/\u001b\[\d+m/g, ''));
        };
    });

    afterEach(function() {
        flushFS();
        sys.puts = puts;
    });

    it('should generate controller', function() {
        compound.generators.perform('controller', ['controllerName', 'new', 'edit', 'index']);
        output.should.eql( [ 'create  app/',
        'create  app/controllers/',
        'create  app/helpers/',
        'create  app/views/',
        'create  app/views/controllerName',
        'create  app/controllers/controllerName_controller.js',
        'create  app/helpers/controllerName_helper.js',
        'create  app/views/controllerName/new.ejs',
        'create  app/views/controllerName/edit.ejs',
        'create  app/views/controllerName/index.ejs' ]);

    });
});
