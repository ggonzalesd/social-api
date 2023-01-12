const express = require('express')

const router = express.Router()

router.post('/login',
  async (req, res) => {
    res.send('<h1>Login | building...</h1>')
  }
)

router.post('/signin',
  async (req, res) => {
    res.send('<h1>Signin | building...</h1>')
  }
)

module.exports = router
