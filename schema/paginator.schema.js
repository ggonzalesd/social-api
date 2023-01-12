const joi = require('joi')

const limit = joi.number().integer().positive()
const offset = joi.number().integer().positive().allow(0)

const paginatorSchemaGet = joi.object({
  limit,
  offset
})

module.exports = { paginatorSchemaGet }
