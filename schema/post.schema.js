const joi = require('joi')

const id = joi.number().integer().positive()
const stringId = joi.string().regex(/^[a-z0-9_]{3,36}$/).message('"id" must containt only lowercase letters, numbers and underscores')
const title = joi.string().min(1)
const content = joi.string().min(1)
const nsfw = joi.boolean()
const archived = joi.boolean()

const postSchemaGet = joi.object({
  id: id.required()
})

const postSchemaCreate = joi.object({
  ownerId: stringId.required(),
  groupId: stringId.required(),
  title: title.required(),
  content: content.required(),
  nsfw: nsfw.required()
})

const postSchemaUpdate = joi.object({
  title,
  content,
  nsfw,
  archived
})

module.exports = {
  postSchemaGet,
  postSchemaCreate,
  postSchemaUpdate,
}
