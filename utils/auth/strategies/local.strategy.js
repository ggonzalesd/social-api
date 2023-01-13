const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { Strategy } = require('passport-local')
const UserService = require('./../../../service/user.service')

const service = new UserService()

const LocalStrategy = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
  try{
    const user = await service.getByUsername(username)
    if (!user)
      done(boom.unauthorized('User not found'), false)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      done(boom.unauthorized('Password dont match'), false)
    delete user.dataValues.password
    done(null, user)
  }catch(err){
    done(err, false)
  }
})

module.exports = LocalStrategy
