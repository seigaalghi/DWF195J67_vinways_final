'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Artist.hasMany(models.Music, { foreignKey: 'artistId', as: 'musics' });
    }
  }
  Artist.init(
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      age: DataTypes.INTEGER,
      type: DataTypes.STRING,
      start: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Artist',
    }
  );
  return Artist;
};
