var Seed = require('./seed');

module.exports = function (compound) {

    compound.tools.seed = function (compound, args) {
        var action = args.shift() || 'plant';
        var seed = new Seed(compound);
        seed.on('complete', function () {
            process.exit();
        });
        var seedPath = compound.root + '/db/seeds/' + compound.app.get('env');

        switch (action) {
            default:
            case 'plant':
            case 'read':
            seed.plant(compound, seedPath);
            break;
            case 'harvest':
            case 'write':
            seed.harvest(compound, seedPath, 'coffee');
            break;
        }
    };

    compound.seed = function(done) {
        var seed = new Seed(compound);
        seed.on('complete', done);
        seed.plant(compound, compound.root + '/db/seeds/' + compound.app.get('env'));
    };

    compound.tools.seed.help = {
        shortcut: 'sd',
        usage: 'seed plant|harvest',
        description: 'Populate database with seed data'
    };

};
