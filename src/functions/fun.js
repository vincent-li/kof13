module.exports = function(root) {
    return {
        date: require(root + '/functions/date'),
        encode: require(root + '/functions/encode'),
        res: require(root + '/functions/response')
    }
}
