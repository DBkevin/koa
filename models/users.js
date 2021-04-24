'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Posts,{sourceKey:'id',foreignKey:'user_id'});
    }
  };
  Users.init({
    name: DataTypes.CHAR,
    email: DataTypes.CHAR,
    password: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};