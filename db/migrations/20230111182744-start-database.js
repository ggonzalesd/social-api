'use strict';
const { UserSchema, USER_TABLE } = require('./../models/user.model')
const { PostSchema, POST_TABLE } = require('./../models/post.model')
const { GroupSchema, GROUP_TABLE } = require('./../models/group.model')
const { CommentSchema, COMMENT_TABLE } = require('./../models/comment.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema)
    await queryInterface.createTable(GROUP_TABLE, GroupSchema)
    await queryInterface.createTable(POST_TABLE, PostSchema)
    await queryInterface.createTable(COMMENT_TABLE, CommentSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(COMMENT_TABLE)
    await queryInterface.dropTable(POST_TABLE)
    await queryInterface.dropTable(GROUP_TABLE)
    await queryInterface.dropTable(USER_TABLE)
  }
};
