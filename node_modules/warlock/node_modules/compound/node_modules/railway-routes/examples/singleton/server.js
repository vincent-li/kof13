var express = require('express')
  , Map = require('../../lib/railway_routes').Map;

var app = express();

app.use(app.router);

var map = new Map(app, function(namespace, controller, action) {
  console.log(arguments);
});

map.resources('users', function(user) {
  map.resources('posts', function(post) {
    map.resources('comments');
  });
  //user.singleton('account');
});

map.resource('account', {controller: 'users'}, function(account) {
  map.resources('posts', function(post) {
    map.resources('comments');
  });
});

console.log(app.routes);

app.listen(3000, function(){
  console.log('Express server listening at http://localhost:3000');
});
