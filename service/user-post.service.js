const boom = require('@hapi/boom')
const { models } = require('./../lib/sequelize')
const UserService = require('./../service/user.service')
const PostService = require('./../service/post.service')

const postService = new PostService()
const userService = new UserService()

class UserPostService {

  async like({ userId, postId }) {
    await userService.find(userId)
    await postService.find(postId)
    const likedPost = await models.UserPost.findOne({where:{userId, postId}})
    if ( likedPost )
      throw boom.conflict(`User '${userId}' already liked the post '${postId}'`)
    const liked = await models.UserPost.create({userId, postId})
    return liked
  }

  async unlike({ userId, postId }) {
    await userService.find(userId)
    await postService.find(postId)
    const likedPost = await models.UserPost.findOne({where:{userId, postId}})
    if ( !likedPost )
      throw boom.conflict(`User '${userId}' didn't like the post '${postId}'`)
    const rta = await models.UserPost.destroy({where:{userId, postId}})
    return rta
  }

}

module.exports = UserPostService
