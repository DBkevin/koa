const { sequelize } = require('../core/db');
const { Sequelize, Model } = require('sequelize');
//定以用户模型
class UsersModel extends Model {
}
UsersModel.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false,
        comment: '管理员邮箱'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '加密后的密码'
    },
}, {
    sequelize,
    modelName: 'Users',
});
exports = module.exports = {
   UsersModel
}