'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Music', [
      {
        title: 'Louder',
        artistId: 1,
        year: 2018,
        premium: true,
        img: 'http://res.cloudinary.com/seiga/raw/upload/v1607425355/coways/music-images/hvttipwqnbo0m7pvdhnn.png',
        audio: 'http://res.cloudinary.com/seiga/raw/upload/v1607425367/coways/audio/qhewjj0y91uzyjdi2spa.ogg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
