'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   const article = []
    faker.locale = "id_ID"
    for(let i=0;i<100;i++){
      article.push({
        title: faker.lorem.sentence(),
        body: faker.lorem.sentences(),
        author: faker.internet.userName(),
        user_id: faker.random.number({
          'max': 100
      }),
        created_at: new Date,
        updated_at: new Date,
      })
    }
    return queryInterface.bulkInsert('articles', article, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
