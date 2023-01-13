'use strict';
const { UserPostSchema, USER_POST_TABLE } = require('./../models/user-post.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_POST_TABLE, UserPostSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_POST_TABLE)
  }
};
