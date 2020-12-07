'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Music, { through: { model: 'Likes' }, as: 'likes' });
      User.belongsToMany(models.Music, { through: { model: 'Playlists' }, as: 'playlists' });
      User.hasMany(models.Transaction, { as: 'transactions', foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      premium: DataTypes.BOOLEAN,
      until: DataTypes.DATE,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
