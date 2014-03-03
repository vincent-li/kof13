exports.init = function initGenerators(compound) {
    compound.generators.register('controller', require('./lib/controller.js'));
    compound.generators.register('model', require('./lib/model.js'));
    compound.generators.register('crud', require('./lib/crud.js'));
};
