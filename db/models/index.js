const { User, UserSchema } = require('./user.model')
const { Post, PostSchema } = require('./post.model')
const { Group, GroupSchema } = require('./group.model')
const { Comment, CommentSchema } = require('./comment.model')

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Post.init(PostSchema, Post.config(sequelize))
  Group.init(GroupSchema, Group.config(sequelize))
  Comment.init(CommentSchema, Comment.config(sequelize))

  User.associate(sequelize.models)
  Group.associate(sequelize.models)
  Post.associate(sequelize.models)
  Comment.associate(sequelize.models)
}

module.exports = setUpModels
