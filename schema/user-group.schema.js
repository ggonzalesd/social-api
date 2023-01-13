const joi = require('joi')

const id = joi.string().regex(/^[a-z0-9_]{3,36}$/).message('"id" must containt only lowercase letters, numbers and underscores')
const role = joi.string().valid('member', 'mod')
const banned = joi.boolean()
const canPost = joi.boolean()

const userSchemaJoinGet = joi.object({
  userId: id.required(),
  groupId: id.required(),
})

const userSchemaJoinUpdate = joi.object({
  role,
  banned,
  canPost
})

module.exports = {
  userSchemaJoinGet,
  userSchemaJoinUpdate
}
