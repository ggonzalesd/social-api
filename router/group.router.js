const express = require('express')

const GroupService = require('./../service/group.service')
const validatorHandlerGen = require('./../middleware/validator.handler.gen')
const { paginatorSchemaGet } = require('./../schema/paginator.schema')
const {
  groupSchemaGet,
  groupSchemaCreate,
  groupSchemaUpdate,
} = require('./../schema/group.schema')

const router = express.Router()
const service = new GroupService()

router.get('/',
  validatorHandlerGen(paginatorSchemaGet, 'query'),
  async (req, res, next) => {
  try {
    const groups = await service.all(req.query)
    res.json(groups)
  } catch(err) {
    next(err)
  }
  }
)

router.get('/:id',
  validatorHandlerGen(groupSchemaGet, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const group = await service.find(id)
    res.json(group)
  } catch(err) {
    next(err)
  }
  }
)

router.post('/',
  validatorHandlerGen(groupSchemaCreate, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body
    const group = await service.create(body)
    res.status(201).json(group)
  } catch(err) {
    next(err)
  }
  }
)

router.patch('/:id',
  validatorHandlerGen(groupSchemaGet, 'params'),
  validatorHandlerGen(groupSchemaUpdate, 'body'),
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
  validatorHandlerGen(groupSchemaGet, 'params'),
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
