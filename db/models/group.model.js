const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model')

const GROUP_TABLE = 'groups'

const GroupSchema = {
  id: {
    type: DataTypes.STRING(64),
    allowNull: false,
    primaryKey: true,
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
  display: {
    allowNull: false,
    type: DataTypes.STRING(64)
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(500),
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING(7)
  },
  nsfw: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  privated: {
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

class Group extends Model {
  static associate(models) {
    //this.belongsTo(models.User, {as:'owner'})
    // this.hasMany(models.Order, { as:'orders', foreignKey: 'userId' })
    // this belongsTo(models.Table, {as:'name'}) // this must to have an foreign key
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GROUP_TABLE,
      modelName: 'Group',
      timestamps: false
    }
  }
}

module.exports = {
  GROUP_TABLE,
  GroupSchema,
  Group
}
