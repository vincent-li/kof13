if (!process.env.TRAVIS) {
    require('semicov').init('lib', 'Railway Routes'); // 'lib' is name of dir with code
    process.on('exit', require('semicov').report);
}

var routes = require('../');
function fakeApp(container) {
    var app = {};
    ['get', 'post', 'put', 'del', 'delete', 'all'].forEach(function (m) {
        app[m] = function () {
            var args = [].slice.call(arguments);
            args.unshift(m.toUpperCase());
            container.push(args);
        };
    });
    app.set = function () {};
    return app;
}

function fakeBridge() {
    return function (ns, controller, action) {
        return ns + controller + '#' + action;
    };
}

suite('Routing map');

var paths, map;

beforeEach(function() {
    paths = [];
    map = new routes.Map(fakeApp(paths), fakeBridge());
});

test('should produce routes for all methods', function() {
    map.get('/signin', 'session#new');
    map.post('/signin', 'session#create');
    map.del('/signout', 'session#destroy');
    map.get('/signup', 'users#new');
    map.put('/signup', 'users#create');
    map.all('/path', 'controller#action');

    paths.should.eql([
        [ 'GET', '/signin', 'session#new' ],
        [ 'POST', '/signin', 'session#create' ],
        [ 'DEL', '/signout', 'session#destroy' ],
        [ 'GET', '/signup', 'users#new' ],
        [ 'PUT', '/signup', 'users#create' ],
        [ 'ALL', '/path', 'controller#action' ]
    ]);
    map.pathTo.signin().should.equal('/signin');
    map.pathTo.signin.toString().should.equal('/signin');
    map.pathTo.signout().should.equal('/signout');
    map.pathTo.signup().should.equal('/signup');
    map.pathTo.path().should.equal('/path');
});

test('should create resourceful routes', function() {
    map.resources('users');
    paths.should.eql([
        [ 'GET', '/users.:format?', 'users#index' ],
        [ 'POST', '/users.:format?', 'users#create' ],
        [ 'GET', '/users/new.:format?', 'users#new' ],
        [ 'GET', '/users/:id/edit.:format?', 'users#edit' ],
        [ 'DELETE', '/users/:id.:format?', 'users#destroy' ],
        [ 'PUT', '/users/:id.:format?', 'users#update' ],
        [ 'GET', '/users/:id.:format?', 'users#show' ]
    ]);
    map.pathTo.users().should.equal('/users');
    map.pathTo.users.toString().should.equal('/users');
    map.pathTo.new_user().should.equal('/users/new');
    map.pathTo.new_user.toString().should.equal('/users/new');
    map.pathTo.edit_user(1).should.equal('/users/1/edit');
    map.pathTo.user(2).should.equal('/users/2');
});

test('should describe namespaced route', function () {
    map.namespace('admin', function (admin) {
        admin.get('dashboard', 'dashboard#index');
    });
    paths.should.eql([
        [ 'GET', '/admin/dashboard', 'admin/dashboard#index' ]
    ]);
    map.pathTo.admin_dashboard().should.equal('/admin/dashboard');
});

test('should describe namespaced resource', function() {
    map.namespace('admin', function (admin) {
        admin.resources('pages');
    });
    paths.should.eql([
        [ 'GET', '/admin/pages.:format?', 'admin/pages#index' ],
        [ 'POST', '/admin/pages.:format?', 'admin/pages#create' ],
        [ 'GET', '/admin/pages/new.:format?', 'admin/pages#new' ],
        [ 'GET', '/admin/pages/:id/edit.:format?', 'admin/pages#edit' ],
        [ 'DELETE', '/admin/pages/:id.:format?', 'admin/pages#destroy' ],
        [ 'PUT', '/admin/pages/:id.:format?', 'admin/pages#update' ],
        [ 'GET', '/admin/pages/:id.:format?', 'admin/pages#show' ]
    ]);
    map.pathTo.admin_pages.toString().should.equal('/admin/pages');
    map.pathTo.new_admin_page().should.equal('/admin/pages/new');
    map.pathTo.new_admin_page.toString().should.equal('/admin/pages/new');
    map.pathTo.edit_admin_page(1).should.equal('/admin/pages/1/edit');
    map.pathTo.admin_page(2).should.equal('/admin/pages/2');
});

test('should allow to overwrite path and helper', function() {
    map.resources('avatars', {as: 'images', path: 'pictures'});
    paths.should.eql([
        [ 'GET', '/pictures.:format?', 'avatars#index' ],
        [ 'POST', '/pictures.:format?', 'avatars#create' ],
        [ 'GET', '/pictures/new.:format?', 'avatars#new' ],
        [ 'GET', '/pictures/:id/edit.:format?', 'avatars#edit' ],
        [ 'DELETE', '/pictures/:id.:format?', 'avatars#destroy' ],
        [ 'PUT', '/pictures/:id.:format?', 'avatars#update' ],
        [ 'GET', '/pictures/:id.:format?', 'avatars#show' ]
    ]);
    map.pathTo.images.toString().should.equal('/pictures');
    map.pathTo.new_image.toString().should.equal('/pictures/new');
    map.pathTo.edit_image(1).should.equal('/pictures/1/edit');
    map.pathTo.image(1602).should.equal('/pictures/1602');
});

test('should handle root url', function() {
    map.root('dashboard#home');
    paths.should.eql([
        [ 'GET', '/', 'dashboard#home' ]
    ]);
    map.pathTo.root.toString().should.equal('/');
    map.pathTo.root().should.equal('/');
});

test('should allow to specify url helper name', function() {
    map.get('/p/:id', 'posts#show', {as: 'post'});
    map.get('/p/:id/edit', 'posts#edit', {as: 'post_edit'});
    paths.should.eql([
        [ 'GET', '/p/:id', 'posts#show' ],
        [ 'GET', '/p/:id/edit', 'posts#edit' ]
    ]);
    map.pathTo.post(1).should.equal('/p/1');
    map.pathTo.post_edit(1).should.equal('/p/1/edit');
});

test('should handle question mark after param name', function() {
    map.get('/test/:p1?', 'test#test');
    map.pathTo.test().should.equal('/test');
    map.pathTo.test('').should.equal('/test');
    map.pathTo.test('param').should.equal('/test/param');
});

test('should allow named parameters in url helpers', function () {
    map.get('/testme/:p1/:p2', 'test#me');
    map.pathTo.testme({
        p1: 'hello',
        p2: 'world'
    }).should.eql('/testme/hello/world');
});

test('should allow to list objects with ids as params', function () {
    map.get('/users/:user_id/posts/:id', 'test#me');
    map.pathTo.user_post({id: 4}, {id: 2}).should.equal('/users/4/posts/2');
});

test('should allow to specify manual helper name for resources', function () {
    // singular helper
    map.resources('users', {as: 'community', suffix: 'member'});
    // plural helper
    map.resources('cars', {as: 'vehicles'});
    paths.should.eql([
        [ 'GET', '/users.:format?', 'users#index' ],
        [ 'POST', '/users.:format?', 'users#create' ],
        [ 'GET', '/users/new.:format?', 'users#new' ],
        [ 'GET', '/users/:id/edit.:format?', 'users#edit' ],
        [ 'DELETE', '/users/:id.:format?', 'users#destroy' ],
        [ 'PUT', '/users/:id.:format?', 'users#update' ],
        [ 'GET', '/users/:id.:format?', 'users#show' ],

        [ 'GET', '/cars.:format?', 'cars#index' ],
        [ 'POST', '/cars.:format?', 'cars#create' ],
        [ 'GET', '/cars/new.:format?', 'cars#new' ],
        [ 'GET', '/cars/:id/edit.:format?', 'cars#edit' ],
        [ 'DELETE', '/cars/:id.:format?', 'cars#destroy' ],
        [ 'PUT', '/cars/:id.:format?', 'cars#update' ],
        [ 'GET', '/cars/:id.:format?', 'cars#show' ]
    ]);
    Object.keys(map.pathTo).should.eql([
        'community',
        'new_community_member',
        'edit_community_member',
        'community_member',

        'vehicles',
        'new_vehicle',
        'edit_vehicle',
        'vehicle'
    ]);
});

test('should only replace last collection_id when collection: true', function() {
    map.resources('posts', function (post) {
        post.resources('comments', function (comment) {
            comment.get('report', 'comments#report');
            comment.get('tag-with/:tag', 'comments#tag');
            comment.get('reload', 'comments#reload', {collection: true});
            comment.get('destroyAll/:filter', 'comments#destroyAll', {collection: true});
        });
    });
    paths.slice(0, 4).should.eql([
        [ 'GET', '/posts/:post_id/comments/:comment_id/report', 'comments#report' ],
        [ 'GET', '/posts/:post_id/comments/:comment_id/tag-with/:tag', 'comments#tag' ],
        [ 'GET', '/posts/:post_id/comments/reload', 'comments#reload' ],
        [ 'GET', '/posts/:post_id/comments/destroyAll/:filter', 'comments#destroyAll' ]
    ]);
});

test('should camelize helper names', function() {
    map.camelCaseHelperNames = true;
    map.resources('posts', function (post) {
        post.resources('comments');
    });
    Object.keys(map.pathTo).should.eql([
        'postComments',
        'newPostComment',
        'editPostComment',
        'postComment',
        'posts',
        'newPost',
        'editPost',
        'post'
    ]);
});

test('should provide convenient api for collection-wide nested routes', function() {
    map.resources('posts', function(post) {
        post.collection(function(posts) {
            posts.del('destroyAll', 'posts#destroyAll');
        });
    });
    paths[0].join(' ').should.equal('DEL /posts/destroyAll posts#destroyAll');
});

test('should be optional to specify controller#action', function () {
    map.resources('posts', function (post) {
        post.get('commentsCount');
        post.get('destroyAll', {collection: true});
    });
    paths[0][2].should.equal('posts#commentsCount');
    paths[1][1].should.equal('/posts/destroyAll');
    paths[1][2].should.equal('posts#destroyAll');
});

test('should clone object with prefix', function() {
    map.get('/test/url', 'test#url', {as: 'testUrl'});
    var clone = map.clone('prefix');
    map.pathTo.testUrl().should.equal('/test/url');
    map.pathTo.testUrl().should.equal('/test/url');
    clone.testUrl().should.equal('/prefix/test/url');
});
