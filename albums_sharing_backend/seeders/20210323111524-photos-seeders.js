'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return await queryInterface.bulkInsert('photos', [
      {nom: '/pictures/food2.jpg', albumId: '1', source: 'food2.jpg', createdAt:  moment().format("YYYY-MM-DD H:m:s"),  updatedAt: moment().format("YYYY-MM-DD H:m:s")},
      {nom: '/pictures/food1.jpeg', albumId: '2', source: 'food1.jpeg', createdAt:  moment().format("YYYY-MM-DD H:m:s"),  updatedAt: moment().format("YYYY-MM-DD H:m:s")},
      {nom: '/pictures/food2.jpg', albumId: '2', source: 'food2.jpg', createdAt:  moment().format("YYYY-MM-DD H:m:s"), updatedAt: moment().format("YYYY-MM-DD H:m:s")}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('photos', null, {});
  }
};
