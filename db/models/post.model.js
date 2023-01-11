const { Model, DataTypes, Sequelize } = require('sequelize')

const POST_TABLE = 'posts'

const PostSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  static associate() {
    // this.hasMany(models.Order, { as:'orders', foreignKey: 'userId' })
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
