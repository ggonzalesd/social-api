const boom = require('@hapi/boom')
const { models } = require('./../lib/sequelize')
const UserService = require('./../service/user.service')
const GroupService = require('./../service/group.service')

const groupService = new GroupService()
const userService = new UserService()

class UserGroupService {

  async join({ userId, groupId }) {
    await userService.find(userId)
    await groupService.find(groupId)
    const joinUserGroup = await models.UserGroup.findOne({where:{userId, groupId}})
    if ( joinUserGroup )
      throw boom.conflict(`User '${userId}' is already in group '${groupId}'`)
    const union = await models.UserGroup.create({userId, groupId})
    return union
  }

  async leave({ userId, groupId }) {
    await userService.find(userId)
    await groupService.find(groupId)
    const joinUserGroup = await models.UserGroup.findOne({where:{userId, groupId}})
    if ( !joinUserGroup )
      throw boom.conflict(`User '${userId}' is not in group '${groupId}'`)
    const rta = await models.UserGroup.destroy({where:{userId, groupId}})
    return rta
  }

  async update({ userId, groupId }, body) {
    await userService.find(userId)
    await groupService.find(groupId)
    const joinUserGroup = await models.UserGroup.findOne({where:{userId, groupId}})
    if ( !joinUserGroup )
      throw boom.conflict(`User '${userId}' is not in group '${groupId}'`)
      const rta = await models.UserGroup.update(body, {where:{userId, groupId}})
      return rta
  }

}

module.exports = UserGroupService
