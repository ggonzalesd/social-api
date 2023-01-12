const joi = require('joi')

const id = joi.string().regex(/^[a-z0-9_]{3,36}$/).message('"id" must containt only lowercase letters, numbers and underscores')
const email = joi.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).message('email does not match')
const password = joi.string().min(8)
const display = joi.string().min(3)
const color = joi.string().regex(/^#([0-8][0-9A-Fa-f]){3}$/)

const userSchemaGet = joi.object({
  id: id.required()
})

const userSchemaCreate = joi.object({
  id: id.required(),
  email: email.required(),
  password: password.required(),
  display: display.required(),
  color: color.required()
})

const userSchemaUpdate = joi.object({
//  password: password.required(),
  display,
  color,
})

module.exports = {
  userSchemaGet,
  userSchemaCreate,
  userSchemaUpdate,
  userId: id
}
