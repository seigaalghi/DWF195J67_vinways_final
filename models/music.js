'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Music.belongsTo(models.Artist, { foreignKey: 'ArtistId', as: 'artist' });
      Music.belongsToMany(models.User, { through: models.Like, as: 'likes' });
      Music.belongsToMany(models.User, { through: models.Playlist, as: 'playlists' });
    }
  }
  Music.init(
    {
      title: DataTypes.STRING,
      ArtistId: DataTypes.INTEGER,
      year: DataTypes.STRING,
      img: DataTypes.STRING,
      audio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Music',
    }
  );
  return Music;
};
