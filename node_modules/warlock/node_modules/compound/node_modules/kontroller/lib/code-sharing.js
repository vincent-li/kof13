module.exports = CodeSharing;

function CodeSharing() {
}

/**
 * Publish some object or function to use in another controller
 *
 * @param {String} name (optional)
 * @param {Mixed} obj
 */
CodeSharing.prototype.publish = function publish(name, obj) {
    if (!this._buffer) {
        this._buffer = {};
    }

    if (typeof name === 'function') {
        obj = name;
        this._buffer[obj.name] = obj;
    } else if (typeof name === 'string') {
        this._buffer[name] = obj;
    }

};

/**
 * Get some object or function published in another controller
 *
 * @param {String} name
 * @return {Mixed} result
 */
CodeSharing.prototype.use = function use(name) {
    var what = this._buffer && this._buffer[name];
    if (typeof what === 'undefined') throw new Error(name + ' is not defined');
    return what;
};

