'use strict';
const faker = require('faker/locale/zh_CN');
const UsersList = [];

for (let index1 = 0; index1 < 10; index1++) {
  let tmp = {};
  if (index1 == 0) {
    tmp.name = "lee";
    tmp.email = "123@123.com";
    tmp.password = '$2a$10$SBdEDqPltvR7uOBJZ6quGedSYXvUuP8QtKLgS0DfKIQs2THbClBFi'; //123123
    tmp.createdAt = new Date();
    tmp.updatedAt= new Date()
    UsersList.push(tmp);
    tmp = null;
  } else {
    tmp.name = faker.name.lastName() + faker.name.firstName();
    tmp.email = faker.internet.email();
    tmp.password = "$2a$10$SBdEDqPltvR7uOBJZ6quGedSYXvUuP8QtKLgS0DfKIQs2THbClBFi"; //123123
    tmp.createdAt = new Date();
    tmp.updatedAt= new Date()
    UsersList.push(tmp);
    tmp = null;
  }
}

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
    await queryInterface.bulkInsert('Users', UsersList);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
