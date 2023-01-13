const boom = require('@hapi/boom')
const { models } = require('./../lib/sequelize')

class GroupService {

  async all({ limit=10, offset=0 }) {
    const groups = await models.Group.findAndCountAll({
      limit,
      offset
    })
    return groups
  }

  async find(id) {
    const group = await models.Group.findByPk(id, {
      include: [
        'posts', 'owner', 'members'
      ]
    })
    if ( !group )
      throw boom.notFound(`Group '${id}' not found!`)
    delete group.dataValues.owner.dataValues.password
    return group
  }

  async create(body) {
    const { ownerId } = body
    const owner = await models.User.findByPk(ownerId)
    if ( !owner )
      throw boom.notFound(`User '${ownerId}' not found!`)
    const group = await models.Group.create(body)
    return group
  }

  async update(id, body) {
    await this.find(id)
    const rta = await models.Group.update(body, { where: { id } })
    return rta
  }

  async destroy(id) {
    await this.find(id)
    const rta = await models.Group.destroy({ where: { id } })
    return rta
  }

}

module.exports = GroupService
