'use strict';

/**
 * sequelize 作为数据接入的中间件
 */
var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

var database = {
    db: C.mysql.database,
    username: C.mysql.user,
    password: C.mysql.password,
    host: C.mysql.host,
    port: C.mysql.port,
    dialect: 'mysql',
    pool: {
        maxConnections: C.mysql.maxConnections || 10,
        minConnections: 0,
        maxIdleTime: 30000
    },
    logging: !!process.env.SQL_DEBUG,
};
// 是否要在app启动的时候同步数据库。一般我们不需要这么做。默认false
// 这里标注下，可以在这里开启。
database.syncFirst = false;

// mysql 添加 longtext数据类型
// dialect 也可以是 sqlite 这块
Sequelize.LONGTEXT = DataTypes.LONGTEXT = DataTypes.TEXT;
if (database.dialect === 'mysql') {
    Sequelize.LONGTEXT = DataTypes.LONGTEXT = 'LONGTEXT';
}

database.define = {
    timestamps: true,
    createdAt: 'gmt_create',
    updatedAt: 'gmt_modified',
    charset: 'utf8',
    collate: 'utf8_general_ci',
};

var sequelize = new Sequelize(database.db, database.username, database.password, database);

module.exports = sequelize;
