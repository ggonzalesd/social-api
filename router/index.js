const express = require('express')

const authRouter = require('./auth.router')
const userRouter = require('./user.router')
const groupRouter = require('./group.router')
const postRouter = require('./post.router')
const commentRouter = require('./comment.router')
const userGroupRouter = require('./user-group.router')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)
router.use('/user-group', userGroupRouter)

module.exports = router
