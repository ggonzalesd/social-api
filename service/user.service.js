const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { models } = require('./../lib/sequelize')

class UserService {

  async all({ limit=10, offset=0 }) {
    const users = await models.User.findAndCountAll({
      limit,
      offset,
      attributes: {exclude: ['password']},
    })
    return users
  }

  async find(id) {
    const user = await models.User.findByPk(id, {
      include: [
        'posts', 'comments', 'groups'
      ],
      attributes: {exclude: ['password']},
    })
    if ( !user )
      throw boom.notFound(`User '${id}' not found!`)
    return user
  }

  async getByUsername(id) {
    const user = await models.User.findByPk(id)
    if ( !user )
      throw boom.notFound(`User '${id}' not found!`)
    return user
  }

  async create(body) {
    const password = await bcrypt.hash(body.password, 10)
    const user = await models.User.create({ ...body, password })
    delete user.dataValues.password
    return user
  }

  async update(id, body) {
    await this.find(id)
    const rta = await models.User.update(body, { where: { id } })
    return rta
  }

  async destroy(id) {
    await this.find(id)
    const rta = await models.User.destroy({ where: { id } })
    return rta
  }

}

module.exports = UserService
