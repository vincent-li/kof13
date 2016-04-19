'use strict';

/**
 * model 初始化.
 */
var fs = require('fs');
var sequelize = require('./db');

module.exports = function() {
    D = {
        sequelize: sequelize,
        query: function*(sql, args) {
            var options = {
                replacements: args
            };
            var data = yield this.sequelize.query(sql, options).spread();
            if (/select /i.test(sql)) {
                return data[0];
            }
            return data[1];
        },
        queryOne: function*(sql, args) {
            var rows = yield * this.query(sql, args);
            return rows && rows[0];
        }
    };

    fs.readdirSync(C.model).forEach(function(name) {
        var modelExt = '.js'
        if (name.indexOf(modelExt) > -1) {
            name = name.replace(modelExt, '').toLowerCase();
            D[name] = sequelize.import(C.model + name);
        }
    });
}
