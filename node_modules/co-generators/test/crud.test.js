var sys = require('sys');

describe('crud', function() {
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

    it('should generate scaffold', function() {
        compound.generators.perform('scaffold', ['post', 'title', 'content']);
        output.should.eql([ 'create  app/',
        'create  app/controllers/',
        'create  app/helpers/',
        'create  app/views/',
        'create  app/views/posts/',
        'create  app/views/layouts',
        'create  test/',
        'create  test/controllers/',
        'create  app/controllers/posts_controller.js',
        'exists  app/',
        'create  app/models/',
        'create  app/models/post.js',
        'create  app/views/layouts/posts_layout.ejs',
        'create  app/views/posts/_form.ejs',
        'create  app/views/posts/show.ejs',
        'create  app/views/posts/new.ejs',
        'create  app/views/posts/edit.ejs',
        'create  app/views/posts/index.ejs',
        'create  app/helpers/posts.js',
        'create  test/controllers/posts_controller.test.js',
        'create  test/init.js']);

        var posts = getFile(app.root + '/app/views/posts/index.ejs');
        posts.should.include('pathTo.edit_post');
        posts.should.include('pathTo.new_post');
        posts.should.not.include('pathTo.edit_posts');
        posts.should.not.include('pathTo.new_posts');

        compound.generators.perform('scaffold', ['users', 'name', 'email']);

        var users = getFile(app.root + '/app/views/users/index.ejs');
        users.should.include('pathTo.edit_user');
        users.should.include('pathTo.new_user');
        users.should.not.include('pathTo.edit_users');
        users.should.not.include('pathTo.new_users');

        var showUser = getFile(app.root + '/app/views/users/show.ejs');
        showUser.should.include('pathTo.users');
        showUser.should.include('pathTo.edit_user(user)');

    });

    it('should allow "model" as fieldname', function() {
        compound.generators.perform('scaffold', ['users', 'modeltest']);
        var usersform = getFile(app.root + '/app/views/users/_form.ejs')
        usersform.should.include('form.input("modeltest")');
    });

    it('should accurately handle camelcase model name', function() {
        compound.generators.perform('scaffold', ['SomeName', 'field']);
        var ctl = getFile(app.root + '/app/controllers/somenames_controller.js');
        output.should.eql([
            'create  app/',
            'create  app/controllers/',
            'create  app/helpers/',
            'create  app/views/',
            'create  app/views/somenames/',
            'create  app/views/layouts',
            'create  test/',
            'create  test/controllers/',
            'create  app/controllers/somenames_controller.js',
            'exists  app/',
            'create  app/models/',
            'create  app/models/SomeName.js',
            'create  app/views/layouts/somenames_layout.ejs',
            'create  app/views/somenames/_form.ejs',
            'create  app/views/somenames/show.ejs',
            'create  app/views/somenames/new.ejs',
            'create  app/views/somenames/edit.ejs',
            'create  app/views/somenames/index.ejs',
            'create  app/helpers/somenames.js',
            'create  test/controllers/somenames_controller.test.js',
            'create  test/init.js'
        ]);
        ctl.should.include('body.SomeName');
        ctl.should.not.include('body.Somename');
    });

    it('should generate scaffold for jade', function() {
        compound.generators.perform('scaffold', ['-tpl', 'jade', 'post', 'title', 'content']);
        output.should.eql([ 'create  app/',
        'create  app/controllers/',
        'create  app/helpers/',
        'create  app/views/',
        'create  app/views/posts/',
        'create  app/views/layouts',
        'create  test/',
        'create  test/controllers/',
        'create  app/controllers/posts_controller.js',
        'exists  app/',
        'create  app/models/',
        'create  app/models/post.js',
        'create  app/views/layouts/posts_layout.jade',
        'create  app/views/posts/_form.jade',
        'create  app/views/posts/show.jade',
        'create  app/views/posts/new.jade',
        'create  app/views/posts/edit.jade',
        'create  app/views/posts/index.jade',
        'create  app/helpers/posts.js',
        'create  test/controllers/posts_controller.test.js',
        'create  test/init.js']);

    });
});
