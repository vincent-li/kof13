var Player = define('Player', function () {
	property('name', String,{index: true});
    property('email', String,{index: true});
    property('password', String);
    property('active', Boolean, {default : true});
    property('createdAt', Date, {default : Date.now});
});