const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    type: DataTypes.STRING(64),
    allowNull: false,
    primaryKey: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  display: {
    allowNull: false,
    type: DataTypes.STRING(64)
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING(7)
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING(16),
    defaultValue: 'client'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW')
  }
}

class User extends Model {
  static associate(models) {
    this.hasMany(models.Post, {
      as:'posts',
      foreignKey: 'ownerId'
    })
    this.hasMany(models.Comment, {
      as:'comments',
      foreignKey: 'ownerId'
    })
    this.hasMany(models.Group, {
      as:'groups',
      foreignKey: 'ownerId'
    })
    // this.hasMany(models.Order, { as:'orders', foreignKey: 'userId' })
    // this belongsTo(models.Table, {as:'name'}) // this must to have an foreign key
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User
}
