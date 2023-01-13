const express = require('express')

const CommentService = require('./../service/comment.service')
const validatorHandlerGen = require('./../middleware/validator.handler.gen')
const { paginatorSchemaGet } = require('./../schema/paginator.schema')
const {
  commentSchemaGet,
  commentSchemaCreate,
  commentSchemaUpdate,
} = require('./../schema/comment.schema')

const router = express.Router()
const service = new CommentService()

router.get('/',
  validatorHandlerGen(paginatorSchemaGet, 'query'),
  async (req, res, next) => {
  try {
    const comments = await service.all(req.query)
    res.json(comments)
  } catch(err) {
    next(err)
  }
  }
)

router.get('/:id',
  validatorHandlerGen(commentSchemaGet, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await service.find(id)
    res.json(comment)
  } catch(err) {
    next(err)
  }
  }
)

router.post('/',
  validatorHandlerGen(commentSchemaCreate, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body
    const comment = await service.create(body)
    res.status(201).json(comment)
  } catch(err) {
    next(err)
  }
  }
)

router.patch('/:id',
  validatorHandlerGen(commentSchemaGet, 'params'),
  validatorHandlerGen(commentSchemaUpdate, 'body'),
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
  validatorHandlerGen(commentSchemaGet, 'params'),
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
