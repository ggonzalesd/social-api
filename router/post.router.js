const express = require('express')

const PostService = require('./../service/post.service')
const validatorHandlerGen = require('./../middleware/validator.handler.gen')
const { paginatorSchemaGet } = require('./../schema/paginator.schema')
const {
  postSchemaGet,
  postSchemaCreate,
  postSchemaUpdate,
} = require('./../schema/post.schema')

const router = express.Router()
const service = new PostService()

router.get('/',
  validatorHandlerGen(paginatorSchemaGet, 'query'),
  async (req, res, next) => {
  try {
    const posts = await service.all(req.query)
    res.json(posts)
  } catch(err) {
    next(err)
  }
  }
)

router.get('/:id',
  validatorHandlerGen(postSchemaGet, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await service.find(id)
    res.json(post)
  } catch(err) {
    next(err)
  }
  }
)

router.post('/',
  validatorHandlerGen(postSchemaCreate, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body
    const post = await service.create(body)
    res.status(201).json(post)
  } catch(err) {
    next(err)
  }
  }
)

router.patch('/:id',
  validatorHandlerGen(postSchemaGet, 'params'),
  validatorHandlerGen(postSchemaUpdate, 'body'),
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
  validatorHandlerGen(postSchemaGet, 'params'),
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
