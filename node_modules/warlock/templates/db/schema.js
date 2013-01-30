var User = define('Person', function () {
    property('email', {index: true});
    property('active', Boolean, {default: true});
    property('createdAt', Date);
});