const { Sequelize } = require('sequelize');
const { dbName, dbHost, port, dbUser, dbPass } = require('../config/index').database;
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: port,
    dialect: 'mysql',
    timezone: '+08:00',
    logging: false,
    define: {
        //给表添加createAt和updateAt
        timestamps: true,
        scopes: {
            noPass: {
                attributes: {
                    exclude:['password']
                }
            }
        }
    }

});
module.exports = {
    sequelize
}