const boom = require('@hapi/boom')
const { models } = require('./../lib/sequelize')

class CommentService {

  async all({ limit=10, offset=0 }) {
    const comment = await models.Comment.findAndCountAll({
      limit,
      offset
    })
    return comment
  }

  async find(id) {
    const comment = await models.Comment.findByPk(id, {
      include: [
        'post', 'owner'
      ]
    })
    if ( !comment )
      throw boom.notFound(`Comment '${id}' not found!`)
    delete comment.dataValues.owner.dataValues.password
    return comment
  }

  async create(body) {
    const { ownerId, postId } = body
    const owner = await models.User.findByPk(ownerId)
    if ( !owner )
      throw boom.notFound(`User '${ownerId}' not found!`)
    const post = await models.Post.findByPk(postId)
    if ( !post )
      throw boom.notFound(`Post '${postId}' not found!`)
    const comment = await models.Comment.create(body)
    return comment
  }

  async update(id, body) {
    await this.find(id)
    const rta = await models.Comment.update(body, { where: { id } })
    return rta
  }

  async destroy(id) {
    await this.find(id)
    const rta = await models.Comment.destroy({ where: { id } })
    return rta
  }

}

module.exports = CommentService
