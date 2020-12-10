'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Seiga',
        email: 'seigaalghi@gmail.com',
        admin: true,
        premium: true,
        until: '2090-12-01 00:00:00',
        password: '$2b$10$zNJDkj59cElG7et/xI19xu6XgsTg.GHIhlAaw5URrHX0.p11rHIzu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Users', null, {});
  },
};
