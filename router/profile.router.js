const express = require('express')
const UserService = require('./../service/user.service')

const router = express.Router()

const userService = new UserService()

router.get('/',
  async (req, res, next) => {
  try {
    const { sub } = req.user
    const user = await userService.find(sub)
    res.json(user)
  } catch(err) {
    next(err)
  }
})

module.exports = router
