## 0.0.9

### params.state

Introducing new param `state`, which allows to specify whether route has push
state when used on client-side.

### Amends in path handling and url helpers

- optional params (followed by question mark) handled correctly
- named params could be filled using object passed to url helpers
- url helpers could be in camelCase (map.camelCaseHelperNames)

### Simplified collection-wide methods for resource, optional controller#action param

Instead of

```javascript
map.resources('posts', function (post) {
    post.del('destroyAll', 'posts#destroyAll', {collection: true});
    post.put('sort', 'posts#sort', {collection: true});
    post.get('rating', 'posts#getRating');
});
```

nicer to do:

```javascript
map.resources('posts', function (post) {
    post.collection(function (posts) {
        post.del('destroyAll');
        post.put('sort');
    });
    post.get('rating', '#getRating');
});
```

### Chainable methods

Every method (post, get, put, delete, all) now returns `map` in order to allow
chain calls.

```javascript
map.get('path', 'ctl#act').post('path/:param', 'ctl#another');
```

### RoutesCollection class

Helpers collection `pathTo` now instanceof RoutesCollection class, which looks
better in stack traces.

## 0.0.8

### Added sub-apps support

Now path helpers inside nested apps returns correct urls:

    // bundle express app as nested
    app.use('/nested', nestedApp);
    // was
    nestedAppRoutes.paths.someRoute() // /some/route
    // now
    nestedAppRoutes.paths.someRoute() // /nested/some/route

### Singleton resources

by Olivier Lalonde, adds map.resource:

Example:

    map.resource('account');

### Additional param to disable appending ".format?"

by Olivier Lalonde:

    map.resource('users' , { path: ':username', appendFormat: false });

Will generate the following routes:

    GET     /account        account#show
    POST    /account        account#create
    GET     /account/new    account#new
    GET     /account/edit   account#edit
    DELETE  /account        account#destroy
    PUT     /account        account#update

## 0.0.7

Support modular railway
