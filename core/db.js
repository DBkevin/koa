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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // 把驼峰命名转换为下划线
        underscored: true,
    }
});
//表不一致就以model为准
sequelize.sync({ alter: true });
module.exports = {
    sequelize
}