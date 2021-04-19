const { sequelize } = require("../core/db");
const { Sequelize, Model } = require('sequelize');
//定以文章模型
class Post extends Model{

}
Post.init({
    id: {
        type: Sequelize.INTEER,
        primaryKey: true,
        autoIncrement: ture
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '文章内容'
    },

}, {
    sequelize
});
//关联用户表 暂定
