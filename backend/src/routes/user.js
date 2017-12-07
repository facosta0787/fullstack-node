import express from 'express'
import User from '../controllers/UserController'

const route = express.Router()

route
  .post('/', async (req,res) => await User.createOrUpdate(req,res) )

module.exports = route
