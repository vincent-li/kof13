var BaseController = require('../').BaseController;

describe('route', function() {
    it('should return route for specific action', function (done) {
        var Ctl = BaseController.constructClass();
        Ctl.actions.hello = function (c) {
            c.world();
        };

        Ctl.prototype.world = function () {
            done();
        };

        var route = Ctl('hello');

        route({}, {}, function () { });
    });

});
