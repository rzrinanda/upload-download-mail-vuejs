'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = []
    faker.locale = "id_ID"
    for(let i=0;i<100;i++){
      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        created_at: new Date,
        updated_at: new Date,
      })
    }
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('users', null, {});
  }
};
