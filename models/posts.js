'use strict';
const {
  Model
} = require('sequelize');
const  timeago = require('timeago.js');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.Users, { foreignKey: "user_id", targetKey: 'id' });
    }
  };
  Posts.init({
    centent: DataTypes.TEXT,
    user_id: {
      type: DataTypes.BIGINT(20),
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
   createdAt:{
      type: DataTypes.DATE,
      get() {
        return timeago.format(this.getDataValue('createdAt'),'zh_CN');
      }
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};