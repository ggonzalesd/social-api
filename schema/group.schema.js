const joi = require('joi')

const id = joi.string().regex(/^[a-z0-9_]{3,36}$/).message('"id" must containt only lowercase letters, numbers and underscores')
const display = joi.string().min(3)
const description = joi.string()
const color = joi.string().regex(/^#([0-8][0-9A-Fa-f]){3}$/)
const nsfw = joi.boolean()
const privated = joi.boolean()

const groupSchemaGet = joi.object({
  id: id.required()
})

const groupSchemaCreate = joi.object({
  id: id.required(),
  ownerId: id.required(),
  description: description.required(),
  display: display.required(),
  color: color.required(),
  nsfw: nsfw.required(),
  privated,
})

const groupSchemaUpdate = joi.object({
  description,
  display,
  color,
  nsfw,
  privated,
})

module.exports = {
  groupSchemaGet,
  groupSchemaCreate,
  groupSchemaUpdate,
}
