var app = module.exports = function getServerInstance(params) {
    return require('compound').createServer({root: __dirname});
};
