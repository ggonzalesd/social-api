const express = require('express')

const UserService = require('./../service/user.service')
const validatorHandlerGen = require('./../middleware/validator.handler.gen')
const { paginatorSchemaGet } = require('./../schema/paginator.schema')
const {
  userSchemaGet,
  userSchemaCreate,
  userSchemaUpdate,
} = require('./../schema/user.schema')

const router = express.Router()
const service = new UserService()

router.get('/',
  validatorHandlerGen(paginatorSchemaGet, 'query'),
  async (req, res, next) => {
  try {
    const users = await service.all(req.query)
    res.json(users)
  } catch(err) {
    next(err)
  }
  }
)

router.get('/:id',
  validatorHandlerGen(userSchemaGet, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await service.find(id)
    res.json(user)
  } catch(err) {
    next(err)
  }
  }
)

router.post('/',
  validatorHandlerGen(userSchemaCreate, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body
    const user = await service.create(body)
    res.status(201).json(user)
  } catch(err) {
    next(err)
  }
  }
)

router.patch('/:id',
  validatorHandlerGen(userSchemaGet, 'params'),
  validatorHandlerGen(userSchemaUpdate, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const rta = await service.update(id, body)
    res.json(rta)
  } catch(err) {
    next(err)
  }
  }
)

router.delete('/:id',
  validatorHandlerGen(userSchemaGet, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const rta = await service.destroy(id)
    res.json(rta)
  } catch(err) {
    next(err)
  }
  }
)

module.exports = router
