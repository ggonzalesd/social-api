const boom = require('@hapi/boom')
const { models } = require('./../lib/sequelize')

class PostService {

  async all({ limit=10, offset=0 }) {
    const posts = await models.Post.findAndCountAll({
      limit,
      offset
    })
    return posts
  }

  async find(id) {
    const post = await models.Post.findByPk(id, {
      include: [
        'group', 'owner', "comments"
      ]
    })
    if ( !post )
      throw boom.notFound(`Post '${id}' not found!`)
    delete post.dataValues.owner.dataValues.password
    return post
  }

  async create(body) {
    const { ownerId, groupId } = body
    const owner = await models.User.findByPk(ownerId)
    if ( !owner )
      throw boom.notFound(`User '${ownerId}' not found!`)
    const group = await models.Group.findByPk(groupId)
    if ( !group )
      throw boom.notFound(`Group '${groupId}' not found!`)
    const post = await models.Post.create(body)
    return post
  }

  async update(id, body) {
    await this.find(id)
    const rta = await models.Post.update(body, { where: { id } })
    return rta
  }

  async destroy(id) {
    await this.find(id)
    const rta = await models.Post.destroy({ where: { id } })
    return rta
  }

}

module.exports = PostService
