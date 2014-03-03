exports.init = function initSeed(compound) {

    if (compound) {
        require('./lib/railway-tools')(compound);
    }

    return false;
};

