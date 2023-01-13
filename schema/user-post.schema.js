const joi = require('joi')

const userId = joi.string().regex(/^[a-z0-9_]{3,36}$/).message('"id" must containt only lowercase letters, numbers and underscores')
const postId = joi.number().integer().positive()

const userSchemaLikeGet = joi.object({
  userId: userId.required(),
  postId: postId.required(),
})

module.exports = {
  userSchemaLikeGet
}
