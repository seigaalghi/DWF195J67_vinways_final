'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, { foreignKey: 'UserId' });
      Playlist.belongsTo(models.Music, { foreignKey: 'MusicId' });
    }
  }
  Playlist.init(
    {
      UserId: DataTypes.INTEGER,
      MusicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Playlist',
    }
  );
  return Playlist;
};
