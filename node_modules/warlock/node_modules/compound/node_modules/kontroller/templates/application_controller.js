var Application = module.exports = function Application(init) {
    init.before(function protectFromForgeryHook(ctl) {
        ctl.protectFromForgery('{{ SECRET }}');
    });
};
