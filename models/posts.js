'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.User)
    }
  };
  Posts.init({
    centent: DataTypes.TEXT,
    user_id: {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};