const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model')
const { POST_TABLE } = require('./post.model')

const COMMENT_TABLE = 'comments'

const CommentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  ownerId: {
    type: DataTypes.STRING(64),
    allowNull: false,
    field: 'owner_id',
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'post_id',
    references: {
      model: POST_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  nsfw: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  archived: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW')
  }
}

class Comment extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as:'owner'})
    this.belongsTo(models.Post, {as:'post'})
    //this.belongsTo(models.User, {as:'owner'})
    // this.hasMany(models.Order, { as:'orders', foreignKey: 'userId' })
    // this belongsTo(models.Table, {as:'name'}) // this must to have an foreign key
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: 'Comment',
      timestamps: false
    }
  }
}

module.exports = {
  COMMENT_TABLE,
  CommentSchema,
  Comment
}
