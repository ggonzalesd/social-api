const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const config = require('./../config')

const router = express.Router()

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
  try {
    const user = req.user
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret)
    res.json({
      user,
      token
    })
  } catch(err) {
    next(err)
  }
  }
)

router.post('/signin',
  async (req, res) => {
    res.send('<h1>Signin | building...</h1>')
  }
)

module.exports = router

/* router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
  try {
    const user = req.user
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret)
    res.json({
      user,
      token
    })
  } catch(err) {
    next(err)
  }
  }
) */
