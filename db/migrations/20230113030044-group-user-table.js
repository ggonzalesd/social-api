'use strict';
const { UserGroupSchema, USER_GROUP_TABLE } = require('./../models/user-group.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_GROUP_TABLE, UserGroupSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_GROUP_TABLE)
  }
};
