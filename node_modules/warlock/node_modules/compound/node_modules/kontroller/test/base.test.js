var should = require('should');
var BaseController = require('../').BaseController;

describe('base', function() {

    it('should construct controller class', function () {
        var Klass = BaseController.constructClass();
        (new Klass).should.be.an.instanceOf(BaseController, 'Constructed class should inherit BaseController');
        Klass.name.should.equal('Controller');
        should.exist(Klass.prototype.render, 'instance method: render');
        should.exist(Klass.prototype.call, 'instance method: call');
        should.exist(Klass.prototype.action, 'instance method: action');
    });

    it('should register action', function () {
        var K1 = BaseController.constructClass();
        var k1 = new K1;
        k1.reset();
        k1.action('test1', function test1(){ return 1;});

        var K2 = BaseController.constructClass();
        var k2 = new K2;
        k2.reset();
        k2.action('test2', function test2(){ return 2;});

        should.exist(k1.constructor.actions.test1);
        should.exist(k2.constructor.actions.test2);
    });

    it('should build controller from script', function () {
        var assertions = new Number(0);
        var code = [
            'action(\'name\', function () {',
            '    demo();',
            '});',
            'demo2();'
        ].join('\n');

        // let's build basic (blank) controller class
        var K = BaseController.constructClass('MyController');
        // add some method manually
        K.prototype.demo = function () {
            assertions += 1;
        }
        // instantiate blank class and add some instance method to object directly
        var k = new K;
        k.demo2 = function () {
            assertions += 2;
        };
        // now configure controller using script (running in context of controller
        // instance)
        k.reset();
        k.build(code);

        // now we can create another instances (already configured)
        var k2 = new K;
        k2.initialize({}, {}, function () {});
        k2.call('name');
        assertions.should.equal(3);
    });

    it('should call __missingAction when action is missing', function (done) {
        function MyController() {
        }
        MyController.prototype.__missingAction = function (c) {
            c.requestedActionName.should.equal('do strange thing');
            c.actionName.should.equal('__missingAction');
            done();
        };
        var K = BaseController.constructClass('MyController', MyController);

        var k = new K;
        k.perform('do strange thing');
    });
});
