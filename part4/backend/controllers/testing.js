const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

testingRouter.post('/', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const username = 'superTest'
  const pwd = 'superTest'
  const passwordHash = await bcrypt.hash(pwd, 10)
  const user = new User({ username: username, passwordHash: passwordHash })
  await user.save()

  response.status(204).end()
})

module.exports = testingRouter