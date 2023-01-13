const express = require('express')

const UserGroupService = require('./../service/user-group.service')
const validatorHandlerGen = require('./../middleware/validator.handler.gen')
const {
  userSchemaJoinGet,
  userSchemaJoinUpdate
} = require('./../schema/user-group.schema')

const router = express.Router()
const service = new UserGroupService()

router.post('/join',
  validatorHandlerGen(userSchemaJoinGet, 'query'),
  async (req, res, next) => {
  try {
    const rta = await service.join(req.query)
    res.json(rta)
  } catch(err) {
    next(err)
  }
  }
)

router.delete('/leave',
  validatorHandlerGen(userSchemaJoinGet, 'query'),
  async (req, res, next) => {
  try {
    const rta = await service.leave(req.query)
    res.json(rta)
  } catch(err) {
    next(err)
  }
  }
)

router.patch('/update',
  validatorHandlerGen(userSchemaJoinGet, 'query'),
  validatorHandlerGen(userSchemaJoinUpdate, 'body'),
  async (req, res, next) => {
  try {
    const rta = await service.update(req.query, req.body)
    res.json(rta)
  } catch(err) {
    next(err)
  }
  }
)

module.exports = router
