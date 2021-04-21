'use strict';

const moment = require("moment")

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
      {nom: 'image1', albumId: '1', source: 'https://images5.alphacoders.com/344/thumb-1920-344761.jpg', createdAt:  moment().format("YYYY-MM-DD H:m:s"),  updatedAt: moment().format("YYYY-MM-DD H:m:s")},
      {nom: 'image2', albumId: '2', source: 'https://images5.alphacoders.com/344/thumb-1920-344761.jpg', createdAt:  moment().format("YYYY-MM-DD H:m:s"),  updatedAt: moment().format("YYYY-MM-DD H:m:s")},
      {nom: 'image3', albumId: '2', source: 'https://images5.alphacoders.com/344/thumb-1920-344761.jpg', createdAt:  moment().format("YYYY-MM-DD H:m:s"), updatedAt: moment().format("YYYY-MM-DD H:m:s")}
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
