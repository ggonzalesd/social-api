const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model')
const { GROUP_TABLE } = require('./group.model')

const USER_GROUP_TABLE = 'users_groups'

const UserGroupSchema = {
  role: {
    allowNull: false,
    type: DataTypes.STRING(16),
    defaultValue: 'member'
  },
  banned: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  canPost: {
    allowNull: false,
    field: 'can_post',
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
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
  groupId: {
    allowNull: false,
    field: 'group_id',
    primaryKey: true,
    type: DataTypes.STRING,
    references: {
      model: GROUP_TABLE,
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

class UserGroup extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_GROUP_TABLE,
      modelName: 'UserGroup',
      timestamps: false
    }
  }
}
module.exports = {
  USER_GROUP_TABLE,
  UserGroupSchema,
  UserGroup
}
