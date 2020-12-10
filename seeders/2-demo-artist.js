'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artists', [
      {
        name: 'Roselia',
        img: 'http://res.cloudinary.com/seiga/raw/upload/v1607425735/coways/artist-images/kcxsnhlrserunsee12ze.jpg',
        age: 24,
        type: 'Band',
        start: '2018',
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
