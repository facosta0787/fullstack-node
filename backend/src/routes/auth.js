import express from 'express'
import Auth from '../controllers/AuthController'

const route = express.Router()
route.post('/signin', async (req, res) => await Auth.signIn(req, res) )
route.post('/signup', async (req,res) =>  await Auth.signUp(req,res) )

module.exports = route
