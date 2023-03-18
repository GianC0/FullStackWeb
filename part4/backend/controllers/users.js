const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

usersRouter.post('/', async (request, response,next) => {
  const { username, name, password } = request.body

  if (password === undefined || password.length < 3) {
    logger.error('Provide a password whose length is at least 3 characters')
    console.log(request.body)
    response.status(400).json({
      error: 'Provide a password whose length is at least 3 characters',
    })
  } else {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({
        error: 'username must be unique',
      })
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })


    try {
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    } catch (error) {
      next(error)
    }
  }

})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',{
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  response.json(users)
})

module.exports = usersRouter