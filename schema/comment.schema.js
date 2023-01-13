const joi = require('joi')

const id = joi.number().integer().positive()
const ownerId = joi.string().regex(/^[a-z0-9_]{3,36}$/).message('"id" must containt only lowercase letters, numbers and underscores')
const content = joi.string().min(1)
const nsfw = joi.boolean()
const archived = joi.boolean()

const commentSchemaGet = joi.object({
  id: id.required()
})

const commentSchemaCreate = joi.object({
  ownerId: ownerId.required(),
  postId: id.required(),
  content: content.required(),
  nsfw: nsfw.required()
})

const commentSchemaUpdate = joi.object({
  content,
  nsfw,
  archived
})

module.exports = {
  commentSchemaGet,
  commentSchemaCreate,
  commentSchemaUpdate,
}
