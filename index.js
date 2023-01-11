const express = require('express')

const config = require('./config')
const apiRouter = require('./router')

const api = express()
const port = config.port

api.use('/api/v1', apiRouter)

api.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})
