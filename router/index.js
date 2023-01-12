const express = require('express')

const authRouter = require('./auth.router')
const userRouter = require('./user.router')
const groupRouter = require('./group.router')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/group', groupRouter)

module.exports = router
