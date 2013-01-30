var Player = define('Player', function () {
	property('name', String);
    property('email', {index: true});
    property('password', Date);
    property('active', Boolean, {default : true});
    property('createdAt', Date, {default : new Date()});
});