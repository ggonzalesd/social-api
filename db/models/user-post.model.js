const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model')
const { POST_TABLE } = require('./post.model')

const USER_POST_TABLE = 'users_posts'

const UserPostSchema = {
  userId: {
    allowNull: false,
    field: 'user_id',
    primaryKey: true,
    type: DataTypes.STRING,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  postId: {
    allowNull: false,
    field: 'post_id',
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: POST_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW')
  }
}

class UserPost extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_POST_TABLE,
      modelName: 'UserPost',
      timestamps: false
    }
  }
}
module.exports = {
  USER_POST_TABLE,
  UserPostSchema,
  UserPost
}
