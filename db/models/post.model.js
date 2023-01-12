const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model')
const { GROUP_TABLE } = require('./group.model')

const POST_TABLE = 'posts'

const PostSchema = {
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
  groupId: {
    type: DataTypes.STRING(64),
    allowNull: false,
    field: 'group_id',
    references: {
      model: GROUP_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING(500),
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

class Post extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as:'owner'})
    this.belongsTo(models.Group, {as:'group'})
    this.hasMany(models.Comment, {
      as:'comments',
      foreignKey: 'postId'
    })
    // this belongsTo(models.Table, {as:'name'}) // this must to have an foreign key
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: 'Post',
      timestamps: false
    }
  }
}

module.exports = {
  POST_TABLE,
  PostSchema,
  Post
}
