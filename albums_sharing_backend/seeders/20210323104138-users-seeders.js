'use strict';

const bcrypt = require('bcrypt')
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

    const hashedPassword1 = await bcrypt.hash("user1", 10)
    const hashedPassword2 = await bcrypt.hash("user2", 10)

    return await queryInterface.bulkInsert('users', [
      {id: 1, email: 'user1@albumphotos.com', nom: 'BISHOP', prenom: 'WALTER', pseudo: "", isVerified: false, token_verif: "", password: hashedPassword1, createdAt:  moment().format("YYYY-MM-DD H:m:s"),  updatedAt: moment().format("YYYY-MM-DD H:m:s")},
      {id: 2, email: 'user2@albumphotos.com', nom: 'MORGAN', prenom: 'Dexter', pseudo: "", isVerified: false, token_verif: "", password: hashedPassword2,  createdAt:  moment().format("YYYY-MM-DD H:m:s"), updatedAt: moment().format("YYYY-MM-DD H:m:s")}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('users', null, {});
  }
};
