const express = require('express')

const UserPostService = require('./../service/user-post.service')
const validatorHandlerGen = require('./../middleware/validator.handler.gen')
const {
  userSchemaLikeGet
} = require('./../schema/user-post.schema')

const router = express.Router()
const service = new UserPostService()

router.post('/like',
  validatorHandlerGen(userSchemaLikeGet, 'query'),
  async (req, res, next) => {
  try {
    const rta = await service.like(req.query)
    res.json(rta)
  } catch(err) {
    next(err)
  }
  }
)

router.delete('/unlike',
  validatorHandlerGen(userSchemaLikeGet, 'query'),
  async (req, res, next) => {
  try {
    const rta = await service.unlike(req.query)
    res.json(rta)
  } catch(err) {
    next(err)
  }
  }
)

module.exports = router
