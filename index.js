const express = require('express')
const cors = require('cors')

const config = require('./config')
const apiRouter = require('./router')
const applyErrorHandlers = require('./middleware/api.error.handler')

const api = express()
const port = config.port

require('./utils/auth')

api.use(cors())
api.use(express.json())

api.use('/api/v1', apiRouter)

applyErrorHandlers(api)

api.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})
