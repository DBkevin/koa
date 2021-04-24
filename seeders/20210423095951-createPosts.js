'use strict';
const faker = require('faker/locale/zh_CN');
const Models = require('../models/index');
const UsersID = [];
const PostsList = [];
async function setPosts() {
  const UserID = await Models.Users.findAll();
  UserID.forEach((item) => {
    UsersID.push(item.id);
  });
  UsersID.sort((a, b) => {
    return a - b;
  });
  for (let index = 0; index < 100; index++) {
    let tmp = {};
    tmp.centent = faker.lorem.sentence();
    tmp.user_id = faker.random.number({ min: UsersID[0], max: UsersID[(UsersID.length - 1)] });
    tmp.createdAt = new Date();
    tmp.updatedAt = new Date();
    PostsList.push(tmp);
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
    await setPosts();

    await queryInterface.bulkInsert('Posts', PostsList);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
